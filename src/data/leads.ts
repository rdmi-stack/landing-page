import fs from "fs";
import path from "path";

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  budget: string;
  message: string;
  formType: string;
  source: string; // page route or UTM source
  timestamp: string; // ISO string
}

const LEADS_FILE = path.join(process.cwd(), "data", "leads.json");

function ensureDir() {
  const dir = path.dirname(LEADS_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function getLeads(): Lead[] {
  ensureDir();
  if (!fs.existsSync(LEADS_FILE)) return [];
  try {
    const data = fs.readFileSync(LEADS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function saveLead(lead: Lead): void {
  ensureDir();
  const leads = getLeads();
  leads.unshift(lead); // newest first
  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));
}
