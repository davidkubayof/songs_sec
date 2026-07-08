export function sendLog(payload) {
    fetch("/api/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            ...payload,
            user_agent: navigator.userAgent,
            page_url: window.location.href,
        }),
    }).catch(() => {});
}
