import { sql } from "@vercel/postgres";
import { ensureTable } from "./db.js";

const MAX_RESPONSE_SIZE = 102400;

function capText(text) {
    if (!text) return text;
    if (text.length <= MAX_RESPONSE_SIZE) return text;
    return text.slice(0, MAX_RESPONSE_SIZE) + "...[truncated]";
}

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).end();
    }

    try {
        await ensureTable();

        const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
        const response =
            typeof body.response === "string" ? capText(body.response) : capText(JSON.stringify(body.response ?? ""));

        await sql`
            INSERT INTO logs (type, method, url, status, ok, duration_ms, response, error_message, stack, user_agent, page_url)
            VALUES (
                ${body.type || "api"},
                ${body.method || null},
                ${body.url || null},
                ${body.status ?? null},
                ${body.ok ?? null},
                ${body.duration_ms ?? null},
                ${response},
                ${body.error_message || null},
                ${body.stack || null},
                ${body.user_agent || null},
                ${body.page_url || null}
            )
        `;
    } catch {}

    return res.status(204).end();
}
