/**
 * Gerçek bir WooCommerce mağazasına karşı smoke test.
 *
 * Çalıştırma:
 *   1) cp .env.example .env
 *   2) .env içine WC_URL / WC_CONSUMER_KEY / WC_CONSUMER_SECRET koy
 *   3) pnpm tsx --env-file=.env examples/smoke.ts
 */
import { WooCommerceClient } from "../src/index.js";

const url = process.env["WC_URL"];
const consumerKey = process.env["WC_CONSUMER_KEY"];
const consumerSecret = process.env["WC_CONSUMER_SECRET"];

if (!url || !consumerKey || !consumerSecret) {
  // eslint-disable-next-line no-console
  console.error(
    "WC_URL / WC_CONSUMER_KEY / WC_CONSUMER_SECRET env değişkenleri gerekli.",
  );
  process.exit(1);
}

const wc = new WooCommerceClient({ url, consumerKey, consumerSecret });

async function main() {
  /* eslint-disable no-console */
  console.log("→ system.status() ...");
  const status = await wc.system.status<{
    environment?: { wc_version?: string; wp_version?: string; site_url?: string };
  }>();
  console.log("  WC:", status.environment?.wc_version);
  console.log("  WP:", status.environment?.wp_version);
  console.log("  URL:", status.environment?.site_url);

  console.log("\n→ products.list({ per_page: 3 }) ...");
  const products = await wc.products.list({ per_page: 3 });
  console.log(`  total=${products.meta.total}, totalPages=${products.meta.totalPages}`);
  for (const p of products.data) {
    console.log(`  #${p.id}  ${p.name}  ${p.price ?? "-"}`);
  }

  console.log("\n→ orders.list({ per_page: 3 }) ...");
  const orders = await wc.orders.list({ per_page: 3 });
  console.log(`  total=${orders.meta.total}`);
  for (const o of orders.data) {
    console.log(`  #${o.id}  status=${o.status}  total=${o.total}  date=${o.date_created ?? "-"}`);
  }

  console.log("\n→ customers.list({ per_page: 3 }) ...");
  const customers = await wc.customers.list({ per_page: 3 });
  console.log(`  total=${customers.meta.total}`);
  for (const c of customers.data) {
    console.log(`  #${c.id}  ${c.email}`);
  }

  console.log("\n→ data.currentCurrency() ...");
  const currency = await wc.data.currentCurrency<{ code: string; symbol: string; name: string }>();
  console.log(`  ${currency.code} (${currency.symbol}) — ${currency.name}`);

  console.log("\n✓ Smoke test bitti.");
  /* eslint-enable no-console */
}

main().catch((err: unknown) => {
  // eslint-disable-next-line no-console
  console.error("✗ Hata:", err);
  process.exit(1);
});
