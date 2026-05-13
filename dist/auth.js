/**
 * WooCommerce REST API için auth helper'ları (HTTPS-only).
 *
 * İki auth modu desteklenir, ikisi de WooCommerce tarafından resmi olarak kabul edilir:
 *
 * 1. **query** (default) — credentials URL query string'ine konur
 *    (`?consumer_key=...&consumer_secret=...`). Authorization header gönderilmez,
 *    böylece Cloudflare gibi reverse proxy WAF'larının Basic-Auth pattern kuralları
 *    tetiklenmez. Üretim ortamlarında en geniş uyumluluk.
 * 2. **basic** — klasik HTTP Basic Authentication header
 *    (`Authorization: Basic base64(key:secret)`). Cloudflare/yönetilen-host arkasında
 *    olmayan mağazalar için tercih edilebilir.
 *
 * Her iki mod da HTTPS zorunludur — düz HTTP store URL'leri reddedilir.
 */
const HTTPS_PROTOCOL = "https:";
/**
 * Basic Auth header değerini ("Basic <base64>") döndürür.
 *
 * @throws Error — boş credential.
 */
export function buildBasicAuthHeader(creds) {
    if (!creds.consumerKey || !creds.consumerSecret) {
        throw new Error("WooCommerce auth: consumerKey and consumerSecret are required");
    }
    const token = Buffer.from(`${creds.consumerKey}:${creds.consumerSecret}`, "utf8").toString("base64");
    return `Basic ${token}`;
}
/**
 * Verilen URL'in HTTPS olduğunu doğrular. Credentials'ı düz HTTP üzerinden
 * göndermek güvensiz — bu yüzden HTTP store URL'leri reddedilir.
 *
 * @throws Error — URL parse edilemezse veya HTTPS değilse.
 */
export function assertHttpsUrl(url) {
    let parsed;
    try {
        parsed = new URL(url);
    }
    catch {
        throw new Error(`WooCommerce auth: invalid URL "${url}"`);
    }
    if (parsed.protocol !== HTTPS_PROTOCOL) {
        throw new Error(`WooCommerce auth: HTTPS required, got "${parsed.protocol}". ` +
            `Use a TLS-enabled store URL.`);
    }
    return parsed;
}
/**
 * Bir URL'e WooCommerce query-string auth parametrelerini ekler.
 * Mevcut query'leri korur.
 */
export function appendQueryAuth(rawUrl, creds) {
    if (!creds.consumerKey || !creds.consumerSecret) {
        throw new Error("WooCommerce auth: consumerKey and consumerSecret are required");
    }
    const url = new URL(rawUrl);
    url.searchParams.set("consumer_key", creds.consumerKey);
    url.searchParams.set("consumer_secret", creds.consumerSecret);
    return url.toString();
}
/**
 * Log'lar için URL'deki credentials'ı maskeler (`consumer_secret=***`).
 * Üretim log'larına credentials'ın kaçmasını engeller.
 */
export function sanitizeUrlForLog(rawUrl) {
    try {
        const url = new URL(rawUrl);
        if (url.searchParams.has("consumer_key"))
            url.searchParams.set("consumer_key", "***");
        if (url.searchParams.has("consumer_secret"))
            url.searchParams.set("consumer_secret", "***");
        return url.toString();
    }
    catch {
        return rawUrl;
    }
}
//# sourceMappingURL=auth.js.map