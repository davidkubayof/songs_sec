import { sql } from "@vercel/postgres";

let initialized = false;

export async function ensureTable() {
    if (initialized) return;
    await sql`
        CREATE TABLE IF NOT EXISTS logs (
            id SERIAL PRIMARY KEY,
            created_at TIMESTAMPTZ DEFAULT NOW(),
            type TEXT NOT NULL,
            method TEXT,
            url TEXT,
            status INT,
            ok BOOLEAN,
            duration_ms INT,
            response TEXT,
            error_message TEXT,
            stack TEXT,
            user_agent TEXT,
            page_url TEXT
        )
    `;
    initialized = true;
}
