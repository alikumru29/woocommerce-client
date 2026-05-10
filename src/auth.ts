/**
 * WooCommerce REST API için HTTPS Basic Auth header üretir.
 *
 * WooCommerce iki auth modu destekler: Basic Auth (HTTPS) ve OAuth 1.0a (HTTP).
 * Bu paket yalnızca Basic Auth'u destekler; HTTPS olmayan store URL'lerinde reddedilir.
 */

const HTTPS_PROTOCOL = "https:";

export interface BasicAuthCredentials {
  consumerKey: string;
  consumerSecret: string;
}

/**
 * Basic Auth header değerini ("Basic <base64>") döndürür.
 *
 * @throws Error — boş credential.
 */
export function buildBasicAuthHeader(creds: BasicAuthCredentials): string {
  if (!creds.consumerKey || !creds.consumerSecret) {
    throw new Error("WooCommerce auth: consumerKey and consumerSecret are required");
  }
  const token = Buffer.from(`${creds.consumerKey}:${creds.consumerSecret}`, "utf8").toString(
    "base64",
  );
  return `Basic ${token}`;
}

/**
 * Verilen URL'in HTTPS olduğunu doğrular. Basic Auth credentials'ı düz HTTP üzerinden
 * göndermek güvensiz — bu yüzden HTTP store URL'leri reddedilir.
 *
 * @throws Error — URL parse edilemezse veya HTTPS değilse.
 */
export function assertHttpsUrl(url: string): URL {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    throw new Error(`WooCommerce auth: invalid URL "${url}"`);
  }
  if (parsed.protocol !== HTTPS_PROTOCOL) {
    throw new Error(
      `WooCommerce auth: HTTPS required for Basic Auth, got "${parsed.protocol}". ` +
        `Use a TLS-enabled store URL.`,
    );
  }
  return parsed;
}
