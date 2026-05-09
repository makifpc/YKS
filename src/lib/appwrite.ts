import { Client, Databases, ID, Query } from 'appwrite';

let client: Client | null = null;
let databases: Databases | null = null;

function getClient() {
  if (typeof window === 'undefined') return null;
  if (!client) {
    client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '');
    databases = new Databases(client);
  }
  return { client, databases };
}

export const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '';
export const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID || '';

export { ID, Query };

export function getDatabases(): Databases {
  const conn = getClient();
  if (!conn || !conn.databases) throw new Error('Appwrite not initialized');
  return conn.databases;
}
