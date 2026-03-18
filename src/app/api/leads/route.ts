import { NextRequest, NextResponse } from "next/server";
import { getLeads } from "@/data/leads";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const source = searchParams.get("source"); // filter by source page
  const type = searchParams.get("type"); // filter by form type
  const limit = parseInt(searchParams.get("limit") || "100", 10);
  const offset = parseInt(searchParams.get("offset") || "0", 10);

  let leads = getLeads();

  if (source) {
    leads = leads.filter((l) => l.source === source);
  }
  if (type) {
    leads = leads.filter((l) => l.formType === type);
  }

  const total = leads.length;
  const paginated = leads.slice(offset, offset + limit);

  return NextResponse.json({
    leads: paginated,
    total,
    limit,
    offset,
  });
}
