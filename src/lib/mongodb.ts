import { Db, MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME || "landing_page";

if (!uri) {
  console.warn("[mongodb] MONGODB_URI is not set; falling back to local lead storage.");
}

declare global {
  var __mongoClientPromise__: Promise<MongoClient> | undefined;
}

export function getMongoClientPromise() {
  if (!uri) {
    return null;
  }

  if (!global.__mongoClientPromise__) {
    const client = new MongoClient(uri);
    global.__mongoClientPromise__ = client.connect();
  }

  return global.__mongoClientPromise__;
}

export async function getMongoDb(): Promise<Db | null> {
  const clientPromise = getMongoClientPromise();

  if (!clientPromise) {
    return null;
  }

  const client = await clientPromise;
  return client.db(dbName);
}
