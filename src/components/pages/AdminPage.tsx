"use client";

import { useState, useEffect, useMemo } from "react";
import {
  LayoutDashboard,
  Globe,
  Users,
  Search,
  Filter,
  ExternalLink,
  LogOut,
  Tag,
  Clock,
  Mail,
  Phone,
  Building2,
  BadgeIndianRupee,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  RefreshCw,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────

interface LandingPageData {
  name: string;
  route: string;
  type: "homepage" | "sitelink" | "landing" | "utm" | "keyword";
  hasNavbar: boolean;
  status: "live" | "planned" | "paused";
  keywords?: string[];
}

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  budget: string;
  message: string;
  formType: string;
  source: string;
  timestamp: string;
}

// ─── Inline data (avoids server import in client component) ───

const landingPages: LandingPageData[] = [
  { name: "Homepage", route: "/", type: "homepage", hasNavbar: true, status: "live", keywords: ["software development company India", "custom software development company India", "app development company India", "mobile app development company India", "hire software developers India", "SaaS development company India", "AI development company India", "web application development company India", "IT outsourcing company India", "MVP development company India"] },
  { name: "Get Free Quote", route: "/get-quote", type: "sitelink", hasNavbar: false, status: "live" },
  { name: "Products", route: "/products", type: "sitelink", hasNavbar: false, status: "live" },
  { name: "Services", route: "/services", type: "sitelink", hasNavbar: true, status: "live" },
  { name: "About Us", route: "/about", type: "sitelink", hasNavbar: false, status: "live" },
  { name: "How It Works", route: "/how-it-works", type: "sitelink", hasNavbar: true, status: "live" },
  { name: "Case Studies", route: "/case-studies", type: "sitelink", hasNavbar: true, status: "live" },
  { name: "Contact", route: "/contact", type: "sitelink", hasNavbar: false, status: "live" },
  { name: "FAQ", route: "/faq", type: "sitelink", hasNavbar: true, status: "live" },
  { name: "UTM Landing Page", route: "/lp", type: "utm", hasNavbar: false, status: "live" },
  { name: "SEO Services", route: "/seo-services", type: "landing", hasNavbar: false, status: "live" },
  { name: "Digital Marketing", route: "/digital-marketing", type: "landing", hasNavbar: false, status: "live" },
  { name: "Free SEO Course", route: "/seo-course", type: "landing", hasNavbar: false, status: "live" },
  { name: "Experiment Lab", route: "/lab", type: "landing", hasNavbar: false, status: "live" },
  { name: "Live Dashboard", route: "/dashboard", type: "landing", hasNavbar: false, status: "live" },
  { name: "Admin Panel", route: "/admin", type: "landing", hasNavbar: false, status: "live" },
  // Keyword landing pages
  {
    name: "Custom Software Development",
    route: "/kw/software-development-company",
    type: "keyword",
    hasNavbar: false,
    status: "planned",
    keywords: ["software development company India", "custom software development company India", "custom software development services India", "best software development company India", "top software company India"],
  },
  {
    name: "App Development",
    route: "/kw/app-development-company",
    type: "keyword",
    hasNavbar: false,
    status: "planned",
    keywords: ["app development company India", "mobile app development company India", "android app development company India", "iOS app development company India", "cross platform app development India"],
  },
  {
    name: "Web Application Development",
    route: "/kw/web-development-company",
    type: "keyword",
    hasNavbar: false,
    status: "planned",
    keywords: ["web application development company India", "custom web development India", "full stack development company India", "React development company India", "Node.js development company India"],
  },
  {
    name: "SaaS Development",
    route: "/kw/saas-development-company",
    type: "keyword",
    hasNavbar: false,
    status: "planned",
    keywords: ["SaaS development company India", "SaaS product development India", "build SaaS platform India", "SaaS application development India", "cloud SaaS development company India"],
  },
  {
    name: "MVP & Startup Development",
    route: "/kw/mvp-development-company",
    type: "keyword",
    hasNavbar: false,
    status: "planned",
    keywords: ["MVP development company India", "startup software development India", "MVP development cost India", "software development for startups India", "hire developers for startup India"],
  },
  {
    name: "AI & ML Development",
    route: "/kw/ai-development-company",
    type: "keyword",
    hasNavbar: false,
    status: "planned",
    keywords: ["AI development company India", "AI software development company India", "machine learning development India", "AI chatbot development company India", "AI agent development company India"],
  },
  {
    name: "E-Commerce Development",
    route: "/kw/ecommerce-development-company",
    type: "keyword",
    hasNavbar: false,
    status: "planned",
    keywords: ["ecommerce development company India", "custom ecommerce development India", "marketplace development company India", "online store development India", "Shopify development company India"],
  },
  {
    name: "Enterprise Software (ERP/CRM)",
    route: "/kw/enterprise-software-company",
    type: "keyword",
    hasNavbar: false,
    status: "planned",
    keywords: ["enterprise software development company India", "ERP development company India", "CRM development company India", "custom ERP development India", "enterprise application development India"],
  },
  {
    name: "Hire Developers",
    route: "/kw/hire-developers-india",
    type: "keyword",
    hasNavbar: false,
    status: "planned",
    keywords: ["hire software developers India", "hire dedicated developers India", "hire remote developers India", "hire React developers India", "hire full stack developers India"],
  },
  {
    name: "IT Outsourcing",
    route: "/kw/it-outsourcing-india",
    type: "keyword",
    hasNavbar: false,
    status: "planned",
    keywords: ["IT outsourcing company India", "offshore software development India", "outsource software development India", "software development outsourcing India", "offshore development team India"],
  },
];

// ─── Status badge ────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    live: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    planned: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    paused: "bg-zinc-500/20 text-zinc-400 border-zinc-500/30",
  };
  return (
    <span className={`px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider rounded-full border ${colors[status] || colors.planned}`}>
      {status}
    </span>
  );
}

function TypeBadge({ type }: { type: string }) {
  const colors: Record<string, string> = {
    homepage: "bg-indigo-500/20 text-indigo-400",
    sitelink: "bg-blue-500/20 text-blue-400",
    landing: "bg-purple-500/20 text-purple-400",
    utm: "bg-orange-500/20 text-orange-400",
    keyword: "bg-pink-500/20 text-pink-400",
  };
  return (
    <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded ${colors[type] || "bg-zinc-500/20 text-zinc-400"}`}>
      {type}
    </span>
  );
}

// ─── Lead card ───────────────────────────────────────

function LeadCard({ lead }: { lead: Lead }) {
  const [expanded, setExpanded] = useState(false);
  const date = new Date(lead.timestamp);
  const timeAgo = getTimeAgo(date);

  return (
    <div
     
     
      className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 hover:border-indigo-500/20 transition-colors"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-sm font-semibold text-white truncate">{lead.name}</h4>
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-indigo-500/20 text-indigo-400">
              {lead.formType}
            </span>
          </div>
          <div className="flex items-center gap-3 mt-1.5 text-xs text-zinc-500">
            <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{lead.email}</span>
            {lead.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{lead.phone}</span>}
          </div>
          <div className="flex items-center gap-3 mt-1 text-xs text-zinc-600">
            {lead.company && <span className="flex items-center gap-1"><Building2 className="w-3 h-3" />{lead.company}</span>}
            {lead.budget && <span className="flex items-center gap-1"><BadgeIndianRupee className="w-3 h-3" />{lead.budget}</span>}
            <span className="flex items-center gap-1"><Globe className="w-3 h-3" />{lead.source}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{timeAgo}</span>
          </div>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-zinc-400"
        >
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {expanded && (
        <div className="mt-3 pt-3 border-t border-white/5">
          <div className="flex items-start gap-2">
            <MessageSquare className="w-3.5 h-3.5 text-zinc-500 mt-0.5 shrink-0" />
            <p className="text-xs text-zinc-400 leading-relaxed whitespace-pre-wrap">{lead.message}</p>
          </div>
          <p className="mt-2 text-[10px] text-zinc-600">
            {date.toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "full", timeStyle: "short" })} IST
          </p>
        </div>
      )}
    </div>
  );
}

function getTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

// ─── Main Admin Page ─────────────────────────────────

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"pages" | "leads">("pages");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [leadTypeFilter, setLeadTypeFilter] = useState<string>("all");

  const fetchLeads = async () => {
    setLeadsLoading(true);
    try {
      const res = await fetch("/api/leads?limit=500");
      const data = await res.json();
      setLeads(data.leads || []);
    } catch {
      console.error("Failed to fetch leads");
    } finally {
      setLeadsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Page filtering
  const filteredPages = useMemo(() => {
    return landingPages.filter((p) => {
      if (typeFilter !== "all" && p.type !== typeFilter) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchRoute = p.route.toLowerCase().includes(q);
        const matchKeywords = p.keywords?.some((k) => k.toLowerCase().includes(q));
        if (!matchName && !matchRoute && !matchKeywords) return false;
      }
      return true;
    });
  }, [typeFilter, searchQuery]);

  // Lead filtering
  const filteredLeads = useMemo(() => {
    return leads.filter((l) => {
      if (sourceFilter !== "all" && l.source !== sourceFilter) return false;
      if (leadTypeFilter !== "all" && l.formType !== leadTypeFilter) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          l.name.toLowerCase().includes(q) ||
          l.email.toLowerCase().includes(q) ||
          l.company?.toLowerCase().includes(q) ||
          l.message.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [leads, sourceFilter, leadTypeFilter, searchQuery]);

  // Stats
  const totalLeads = leads.length;
  const todayLeads = leads.filter((l) => {
    const d = new Date(l.timestamp);
    const today = new Date();
    return d.toDateString() === today.toDateString();
  }).length;
  const weekLeads = leads.filter((l) => {
    const d = new Date(l.timestamp);
    const week = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return d.getTime() > week;
  }).length;
  const livePages = landingPages.filter((p) => p.status === "live").length;
  const plannedPages = landingPages.filter((p) => p.status === "planned").length;

  // Unique sources and types for filters
  const uniqueSources = [...new Set(leads.map((l) => l.source))].sort();
  const uniqueFormTypes = [...new Set(leads.map((l) => l.formType))].sort();

  // Leads per source (for page table)
  const leadsPerSource = useMemo(() => {
    const map: Record<string, number> = {};
    leads.forEach((l) => {
      map[l.source] = (map[l.source] || 0) + 1;
    });
    return map;
  }, [leads]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold">RDMI Admin</h1>
                <p className="text-[11px] text-zinc-500">Landing Pages & Leads</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="/"
                className="text-xs text-zinc-500 hover:text-white transition-colors flex items-center gap-1"
              >
                <ExternalLink className="w-3 h-3" /> View Site
              </a>
              <button
                onClick={async () => {
                  await fetch("/api/auth", { method: "DELETE" });
                  window.location.href = "/admin/login";
                }}
                className="text-xs text-zinc-500 hover:text-red-400 transition-colors flex items-center gap-1"
              >
                <LogOut className="w-3 h-3" /> Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
          {[
            { label: "Total Leads", value: totalLeads, color: "from-indigo-500 to-purple-500" },
            { label: "Today", value: todayLeads, color: "from-emerald-500 to-teal-500" },
            { label: "This Week", value: weekLeads, color: "from-blue-500 to-cyan-500" },
            { label: "Live Pages", value: livePages, color: "from-amber-500 to-orange-500" },
            { label: "Planned Pages", value: plannedPages, color: "from-pink-500 to-rose-500" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
              <p className="text-[11px] text-zinc-500 uppercase tracking-wider">{stat.label}</p>
              <p className={`text-2xl font-bold mt-1 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 mb-6 bg-white/[0.03] rounded-xl p-1 w-fit border border-white/[0.06]">
          {[
            { id: "pages" as const, label: "Landing Pages", icon: Globe, count: landingPages.length },
            { id: "leads" as const, label: "Leads", icon: Users, count: totalLeads },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSearchQuery(""); }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30"
                  : "text-zinc-500 hover:text-white border border-transparent"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-white/5">{tab.count}</span>
            </button>
          ))}
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder={activeTab === "pages" ? "Search pages, routes, keywords..." : "Search leads by name, email, company..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/30"
            />
          </div>

          {activeTab === "pages" && (
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-zinc-500" />
              {["all", "homepage", "sitelink", "landing", "utm", "keyword"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    typeFilter === t
                      ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30"
                      : "bg-white/[0.03] text-zinc-500 hover:text-white border border-white/[0.06]"
                  }`}
                >
                  {t === "all" ? "All" : t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          )}

          {activeTab === "leads" && (
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-4 h-4 text-zinc-500" />
              <select
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                className="px-3 py-1.5 rounded-lg text-xs bg-white/[0.03] text-zinc-400 border border-white/[0.06] focus:outline-none"
              >
                <option value="all">All Sources</option>
                {uniqueSources.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <select
                value={leadTypeFilter}
                onChange={(e) => setLeadTypeFilter(e.target.value)}
                className="px-3 py-1.5 rounded-lg text-xs bg-white/[0.03] text-zinc-400 border border-white/[0.06] focus:outline-none"
              >
                <option value="all">All Types</option>
                {uniqueFormTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <button
                onClick={fetchLeads}
                disabled={leadsLoading}
                className="p-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-zinc-400 hover:text-white transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${leadsLoading ? "animate-spin" : ""}`} />
              </button>
            </div>
          )}
        </div>

        {/* ─── Pages Tab ──────────────────────────────── */}
        {activeTab === "pages" && (
          <div className="space-y-3">
            {filteredPages.map((page) => (
              <div
                key={page.route}
               
               
                className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 hover:border-indigo-500/20 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-semibold text-white">{page.name}</h3>
                      <TypeBadge type={page.type} />
                      <StatusBadge status={page.status} />
                      {leadsPerSource[page.route] && (
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-500/20 text-emerald-400">
                          {leadsPerSource[page.route]} lead{leadsPerSource[page.route] > 1 ? "s" : ""}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-500 mt-1 font-mono">{page.route}</p>
                    {page.keywords && page.keywords.length > 0 && (
                      <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                        <Tag className="w-3 h-3 text-zinc-600" />
                        {page.keywords.map((kw) => (
                          <span
                            key={kw}
                            className="px-2 py-0.5 text-[10px] text-zinc-400 bg-white/[0.03] border border-white/[0.04] rounded"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  {page.status === "live" && (
                    <a
                      href={page.route}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-zinc-400 hover:text-white shrink-0"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}

            {filteredPages.length === 0 && (
              <div className="text-center py-12 text-zinc-600 text-sm">No pages match your search.</div>
            )}
          </div>
        )}

        {/* ─── Leads Tab ──────────────────────────────── */}
        {activeTab === "leads" && (
          <div className="space-y-3">
            {leadsLoading && leads.length === 0 ? (
              <div className="text-center py-12 text-zinc-600 text-sm">Loading leads...</div>
            ) : filteredLeads.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
                <p className="text-sm text-zinc-500">No leads yet.</p>
                <p className="text-xs text-zinc-600 mt-1">Leads will appear here as forms are submitted across your landing pages.</p>
              </div>
            ) : (
              filteredLeads.map((lead) => <LeadCard key={lead.id} lead={lead} />)
            )}
          </div>
        )}
      </div>
    </div>
  );
}
