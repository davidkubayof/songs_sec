import { getPreferenceBoolean, getPreferenceString } from "./usePreferences.js";
import { sendLog } from "@/utils/logger.js";

export function fetchJson(url, params, options) {
    if (params) {
        url = new URL(url);
        for (var param in params) url.searchParams.set(param, params[param]);
    }

    const urlStr = url.toString ? url.toString() : String(url);
    const start = performance.now();
    const method = options?.method || "GET";

    return fetch(url, options)
        .then(async response => {
            const duration_ms = Math.round(performance.now() - start);
            const text = await response.clone().text();
            let parsed;
            try {
                parsed = JSON.parse(text);
            } catch {
                parsed = null;
            }

            sendLog({
                type: "api",
                method,
                url: urlStr,
                status: response.status,
                ok: response.ok,
                duration_ms,
                response: text,
                error_message: parsed?.error || parsed?.message || (!response.ok ? `HTTP ${response.status}` : null),
            });

            return JSON.parse(text);
        })
        .catch(err => {
            sendLog({
                type: "error",
                method,
                url: urlStr,
                error_message: err?.message || String(err),
                stack: err?.stack,
            });
            throw err;
        });
}

export function hashCode(s) {
    return s.split("").reduce(function (a, b) {
        a = (a << 5) - a + b.charCodeAt(0);
        return a & a;
    }, 0);
}

export function apiUrl() {
    return getPreferenceString("instance", import.meta.env.VITE_PIPED_API);
}

export function authApiUrl() {
    if (getPreferenceBoolean("authInstance", false)) {
        return getPreferenceString("auth_instance_url", apiUrl());
    } else return apiUrl();
}

export function getAuthToken() {
    return getPreferenceString("authToken" + hashCode(authApiUrl()));
}

export function isAuthenticated() {
    return getAuthToken() !== undefined;
}
