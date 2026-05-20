#!/usr/bin/env python3
"""
Convert a Markdown file to PDF using reportlab (pure Python, no native deps).

Usage:
    python3 scripts/md-to-pdf.py <input.md> [output.pdf]

Handles: H1/H2/H3 headings, paragraphs, bullet + numbered lists, fenced code
blocks (```), pipe tables, horizontal rules (---), **bold**, *italic*, `code`,
and [link](url). Built for the Google Ads API design doc; works on any
similarly-shaped markdown.
"""

import re
import sys
from pathlib import Path

from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, ListFlowable, ListItem, XPreformatted,
)


def md_inline_to_html(text: str) -> str:
    """Convert inline Markdown syntax to reportlab's HTML-like Paragraph markup."""
    # XML escape first so user content can't break the parser
    text = text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    # **bold** -> <b>...</b>  (process before italic so we don't eat the asterisks)
    text = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", text)
    # *italic* -> <i>...</i>
    text = re.sub(r"(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)", r"<i>\1</i>", text)
    # `code` -> monospace
    text = re.sub(
        r"`([^`]+)`",
        r'<font name="Courier" size="9" color="#0a0a0a">\1</font>',
        text,
    )
    # [label](url) -> styled link
    text = re.sub(
        r"\[([^\]]+)\]\(([^)]+)\)",
        r'<link href="\2" color="#0b5fff">\1</link>',
        text,
    )
    return text


def build_styles():
    s = getSampleStyleSheet()
    s["BodyText"].fontSize = 10
    s["BodyText"].leading = 14
    s["BodyText"].spaceAfter = 4

    s["Heading1"].fontSize = 20
    s["Heading1"].leading = 24
    s["Heading1"].spaceAfter = 10
    s["Heading1"].spaceBefore = 0
    s["Heading1"].textColor = colors.HexColor("#0a0a0a")

    s["Heading2"].fontSize = 14
    s["Heading2"].leading = 18
    s["Heading2"].spaceAfter = 6
    s["Heading2"].spaceBefore = 14
    s["Heading2"].textColor = colors.HexColor("#0a0a0a")

    s["Heading3"].fontSize = 11
    s["Heading3"].leading = 14
    s["Heading3"].spaceAfter = 4
    s["Heading3"].spaceBefore = 8
    s["Heading3"].textColor = colors.HexColor("#1a1a1a")

    s.add(
        ParagraphStyle(
            name="CodeBlock",
            parent=s["BodyText"],
            fontName="Courier",
            fontSize=8.5,
            leading=11,
            leftIndent=10,
            rightIndent=10,
            backColor=colors.HexColor("#f5f5f5"),
            borderColor=colors.HexColor("#e5e5e5"),
            borderWidth=0.5,
            borderPadding=6,
            spaceBefore=4,
            spaceAfter=8,
        )
    )
    return s


def parse_table_block(lines, start_idx):
    """Parse a Markdown pipe table starting at lines[start_idx]. Returns (rows, end_idx)."""
    rows = []
    i = start_idx
    while i < len(lines) and lines[i].strip().startswith("|"):
        # skip separator row that's just dashes/pipes/colons
        cells = [c.strip() for c in lines[i].strip().strip("|").split("|")]
        if all(re.match(r"^:?-+:?$", c or "-") for c in cells) and i != start_idx:
            i += 1
            continue
        rows.append(cells)
        i += 1
    return rows, i


def render_table(rows, styles):
    """Render a list of header+data row arrays as a reportlab Table flowable."""
    data = [
        [Paragraph(md_inline_to_html(c), styles["BodyText"]) for c in row]
        for row in rows
    ]
    t = Table(data, repeatRows=1, hAlign="LEFT")
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#f0f0f0")),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("GRID", (0, 0), (-1, -1), 0.25, colors.HexColor("#cccccc")),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ]
        )
    )
    return t


def parse_md_to_flowables(md_text: str, styles):
    flowables = []
    lines = md_text.split("\n")
    i = 0
    n = len(lines)

    while i < n:
        line = lines[i]
        stripped = line.strip()

        # Horizontal rule
        if stripped == "---":
            flowables.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#cccccc"), spaceBefore=6, spaceAfter=6))
            i += 1
            continue

        # Headings
        if stripped.startswith("### "):
            flowables.append(Paragraph(md_inline_to_html(stripped[4:]), styles["Heading3"]))
            i += 1
            continue
        if stripped.startswith("## "):
            flowables.append(Paragraph(md_inline_to_html(stripped[3:]), styles["Heading2"]))
            i += 1
            continue
        if stripped.startswith("# "):
            flowables.append(Paragraph(md_inline_to_html(stripped[2:]), styles["Heading1"]))
            i += 1
            continue

        # Fenced code block
        if stripped.startswith("```"):
            code_lines = []
            i += 1
            while i < n and not lines[i].strip().startswith("```"):
                code_lines.append(lines[i])
                i += 1
            # Escape XML so XPreformatted parses cleanly (it decodes entities back).
            escaped = "\n".join(code_lines).replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
            flowables.append(XPreformatted(escaped, styles["CodeBlock"]))
            i += 1  # skip closing ```
            continue

        # Pipe table (header row | --- separator)
        if stripped.startswith("|") and i + 1 < n and re.match(r"^\|[\s\-:|]+\|?$", lines[i + 1].strip()):
            rows, i = parse_table_block(lines, i)
            flowables.append(render_table(rows, styles))
            flowables.append(Spacer(1, 6))
            continue

        # Bullet list
        if stripped.startswith("- "):
            items = []
            while i < n and lines[i].strip().startswith("- "):
                items.append(
                    ListItem(
                        Paragraph(md_inline_to_html(lines[i].strip()[2:]), styles["BodyText"]),
                        leftIndent=12,
                    )
                )
                i += 1
            flowables.append(ListFlowable(items, bulletType="bullet", leftIndent=18, bulletFontSize=8))
            flowables.append(Spacer(1, 4))
            continue

        # Numbered list
        if re.match(r"^\d+\.\s", stripped):
            items = []
            while i < n and re.match(r"^\d+\.\s", lines[i].strip()):
                txt = re.sub(r"^\d+\.\s", "", lines[i].strip())
                items.append(
                    ListItem(
                        Paragraph(md_inline_to_html(txt), styles["BodyText"]),
                        leftIndent=12,
                    )
                )
                i += 1
            flowables.append(ListFlowable(items, bulletType="1", leftIndent=18, bulletFontSize=9))
            flowables.append(Spacer(1, 4))
            continue

        # Blank line -> small spacer
        if not stripped:
            flowables.append(Spacer(1, 4))
            i += 1
            continue

        # Regular paragraph — collect consecutive non-special lines
        para_lines = [stripped]
        i += 1
        while i < n:
            nxt = lines[i].strip()
            if (
                not nxt
                or nxt.startswith("#")
                or nxt == "---"
                or nxt.startswith("```")
                or nxt.startswith("|")
                or nxt.startswith("- ")
                or re.match(r"^\d+\.\s", nxt)
            ):
                break
            para_lines.append(nxt)
            i += 1
        para_text = " ".join(para_lines)
        flowables.append(Paragraph(md_inline_to_html(para_text), styles["BodyText"]))

    return flowables


def main(argv):
    if len(argv) < 2:
        print(__doc__, file=sys.stderr)
        sys.exit(1)
    inp = Path(argv[1])
    out = Path(argv[2]) if len(argv) > 2 else inp.with_suffix(".pdf")
    if not inp.exists():
        print(f"Input not found: {inp}", file=sys.stderr)
        sys.exit(2)

    md_text = inp.read_text(encoding="utf-8")
    styles = build_styles()
    flowables = parse_md_to_flowables(md_text, styles)

    doc = SimpleDocTemplate(
        str(out),
        pagesize=letter,
        leftMargin=0.7 * inch,
        rightMargin=0.7 * inch,
        topMargin=0.7 * inch,
        bottomMargin=0.7 * inch,
        title=inp.stem.replace("-", " ").title(),
        author="RDMI Tech Ventures Pvt. Ltd.",
    )
    doc.build(flowables)
    print(f"OK → {out}  ({out.stat().st_size:,} bytes)")


if __name__ == "__main__":
    main(sys.argv)
