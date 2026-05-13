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
export type AuthMethod = "query" | "basic";
export interface BasicAuthCredentials {
    consumerKey: string;
    consumerSecret: string;
}
/**
 * Basic Auth header değerini ("Basic <base64>") döndürür.
 *
 * @throws Error — boş credential.
 */
export declare function buildBasicAuthHeader(creds: BasicAuthCredentials): string;
/**
 * Verilen URL'in HTTPS olduğunu doğrular. Credentials'ı düz HTTP üzerinden
 * göndermek güvensiz — bu yüzden HTTP store URL'leri reddedilir.
 *
 * @throws Error — URL parse edilemezse veya HTTPS değilse.
 */
export declare function assertHttpsUrl(url: string): URL;
/**
 * Bir URL'e WooCommerce query-string auth parametrelerini ekler.
 * Mevcut query'leri korur.
 */
export declare function appendQueryAuth(rawUrl: string, creds: BasicAuthCredentials): string;
/**
 * Log'lar için URL'deki credentials'ı maskeler (`consumer_secret=***`).
 * Üretim log'larına credentials'ın kaçmasını engeller.
 */
export declare function sanitizeUrlForLog(rawUrl: string): string;
//# sourceMappingURL=auth.d.ts.map