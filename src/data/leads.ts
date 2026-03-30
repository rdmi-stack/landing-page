import fs from "fs";
import path from "path";
import { getMongoDb } from "@/lib/mongodb";

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
const LEADS_COLLECTION = process.env.MONGODB_LEADS_COLLECTION || "landing_page_leads";

function ensureDir() {
  const dir = path.dirname(LEADS_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function getLocalLeads(): Lead[] {
  ensureDir();
  if (!fs.existsSync(LEADS_FILE)) return [];
  try {
    const data = fs.readFileSync(LEADS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function saveLocalLead(lead: Lead): void {
  ensureDir();
  const leads = getLocalLeads();
  leads.unshift(lead); // newest first
  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));
}

export async function getLeads(): Promise<Lead[]> {
  const db = await getMongoDb();

  if (!db) {
    return getLocalLeads();
  }

  try {
    return await db
      .collection<Lead>(LEADS_COLLECTION)
      .find({})
      .sort({ timestamp: -1 })
      .toArray();
  } catch (error) {
    console.error("[leads] Failed to read from MongoDB, using local fallback:", error);
    return getLocalLeads();
  }
}

export async function saveLead(lead: Lead): Promise<void> {
  const db = await getMongoDb();

  if (!db) {
    saveLocalLead(lead);
    return;
  }

  try {
    await db.collection<Lead>(LEADS_COLLECTION).insertOne(lead);
  } catch (error) {
    console.error("[leads] Failed to write to MongoDB, using local fallback:", error);
    saveLocalLead(lead);
  }
}
