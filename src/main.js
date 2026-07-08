import "@/utils/firefoxMediaCapabilitiesFix.js";
import { createApp } from "vue";
import router from "@/router/router.js";
import App from "./App.vue";
import { sendLog } from "@/utils/logger.js";

import { createI18n } from "vue-i18n";
import enLocale from "@/locales/en.json";
import "./app.css";

import("./registerServiceWorker");

const i18n = createI18n({
    globalInjection: true,
    legacy: false,
    locale: "en",
    fallbackLocale: "en",
    messages: {
        en: enLocale,
    },
});

window.i18n = i18n;

window.addEventListener("error", event => {
    sendLog({
        type: "error",
        error_message: event.message,
        stack: event.error?.stack,
        url: event.filename,
    });
});

window.addEventListener("unhandledrejection", event => {
    const reason = event.reason;
    sendLog({
        type: "error",
        error_message: reason?.message || String(reason),
        stack: reason?.stack,
    });
});

const app = createApp(App);

app.config.errorHandler = (err, instance, info) => {
    sendLog({
        type: "error",
        error_message: err?.message || String(err),
        stack: err?.stack,
        url: info,
    });
};

app.use(i18n);
app.use(router);
app.mount("#app");
