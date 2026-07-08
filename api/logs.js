import { sql } from "@vercel/postgres";
import { ensureTable } from "./db.js";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).end();
    }

    const token = req.query.token;
    if (!token || token !== process.env.LOG_VIEW_TOKEN) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const limit = Math.min(parseInt(req.query.limit) || 100, 500);
    const type = req.query.type;

    await ensureTable();

    const result = type
        ? await sql`SELECT * FROM logs WHERE type = ${type} ORDER BY created_at DESC LIMIT ${limit}`
        : await sql`SELECT * FROM logs ORDER BY created_at DESC LIMIT ${limit}`;

    return res.status(200).json(result.rows);
}
