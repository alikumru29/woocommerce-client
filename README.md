# woocommerce-client

Node.js / TypeScript için **type-safe WooCommerce REST API client**.
`undici` üzerine kurulu, tüm core kaynaklar için Zod doğrulama, asenkron sayfalama,
otomatik retry ve Türkçe-dostu hata mesajları sunar.

[![Node](https://img.shields.io/badge/node-%3E%3D20-brightgreen)](#)
[![TypeScript](https://img.shields.io/badge/types-included-blue)](#)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

---

## İçindekiler

- [Özellikler](#özellikler)
- [Kurulum](#kurulum)
- [Hızlı başlangıç](#hızlı-başlangıç)
- [Yapılandırma](#yapılandırma)
- [Servisler](#servisler)
  - [Products](#products)
  - [Orders](#orders)
  - [Customers](#customers)
  - [Coupons](#coupons)
  - [Refunds](#refunds)
  - [Reports](#reports)
  - [Tax](#tax)
  - [Shipping](#shipping)
  - [Payments](#payments)
  - [Webhooks](#webhooks)
  - [System](#system)
  - [Settings](#settings)
  - [Data](#data)
- [Generic istek (`request<T>()`)](#generic-istek-requestt)
- [Sayfalama](#sayfalama)
- [Hata yönetimi](#hata-yönetimi)
- [Logger](#logger)
- [Test](#test)
- [Geliştirme](#geliştirme)
- [Sıkça sorulanlar](#sıkça-sorulanlar)
- [Lisans](#lisans)

---

## Özellikler

- **Tek client, tüm servisler** — `wc.products`, `wc.orders`, `wc.customers`, `wc.coupons`,
  `wc.refunds`, `wc.reports`, `wc.tax`, `wc.shipping`, `wc.payments`, `wc.webhooks`,
  `wc.system`, `wc.settings`, `wc.data`.
- **Tip güvenli core** — Products, Orders, Customers, Coupons, Refunds için tam Zod şemaları.
- **Generic escape** — Diğer endpoint'ler `wc.request<T>()` ile arbitrer çağrı yapılabilir.
- **Otomatik retry** — Network hataları, 408, 429, 5xx için exponential backoff. `Retry-After`
  header'ına saygı duyar.
- **Async iterator pagination** — `for await (const item of wc.products.iterate())` ile
  tüm sayfalar otomatik dolaşılır.
- **HTTPS Basic Auth** — Tek auth modu; HTTP store URL'leri reddedilir (güvenlik).
- **Yapılandırılabilir logger** — `pino` tabanlı, sessiz mod desteği.
- **ESM-only, Node 20+** — Modern fetch (`undici`).

---

## Kurulum

```bash
# pnpm (önerilen)
pnpm add woocommerce-client

# npm
npm install woocommerce-client

# yarn
yarn add woocommerce-client
```

> Repo henüz npm'e yayınlanmadıysa:
> ```bash
> git clone https://github.com/<user>/woocommerce-client.git
> cd woocommerce-client && pnpm install && pnpm build
> ```

---

## Hızlı başlangıç

```ts
import { WooCommerceClient } from "woocommerce-client";

const wc = new WooCommerceClient({
  url: "https://store.example.com",   // HTTPS zorunlu
  consumerKey: process.env.WC_CONSUMER_KEY!,
  consumerSecret: process.env.WC_CONSUMER_SECRET!,
});

// Ürün listesi (tipli)
const { data: products, meta } = await wc.products.list({ per_page: 50 });
console.log(`Toplam: ${meta.total}`);

// Sipariş oluştur
const order = await wc.orders.create({
  status: "processing",
  payment_method: "bacs",
  billing: { first_name: "Ali", email: "ali@example.com" },
  line_items: [{ product_id: 42, quantity: 2 }],
});

// Tüm tamamlanmış siparişleri otomatik sayfalayarak dolaş
for await (const o of wc.orders.iterate({ status: "completed" })) {
  console.log(o.id, o.total);
}
```

WooCommerce'in API anahtarını üretmek için:
**WP Admin → WooCommerce → Settings → Advanced → REST API → Add key**.

---

## Yapılandırma

```ts
new WooCommerceClient({
  url: "https://store.example.com",
  consumerKey: "ck_xxx",
  consumerSecret: "cs_xxx",

  // Opsiyonel
  version: "wc/v3",          // Default: "wc/v3" — alternatif: "wc/v2", "wc/v1"
  timeout: 30_000,           // ms, default 30s
  retries: 3,                // Network/5xx/429 için yeniden deneme
  retryBaseDelay: 500,       // İlk retry'a kadar bekleme (ms)
  retryMaxDelay: 30_000,     // Maks. retry bekleme (ms)
  logger: pino({ level: "debug" }),  // Custom pino instance
});
```

| Alan | Default | Açıklama |
|------|---------|----------|
| `url` | — | Mağaza URL'i. **HTTPS zorunlu.** |
| `consumerKey` / `consumerSecret` | — | WC REST API anahtarı. |
| `version` | `"wc/v3"` | API sürümü. |
| `timeout` | `30000` | Tek isteğin maksimum süresi (ms). |
| `retries` | `3` | Hata sonrası kaç kez yeniden denenecek. |
| `retryBaseDelay` | `500` | Exponential backoff başlangıç. |
| `retryMaxDelay` | `30000` | Maks. tek bir retry beklemesi. |
| `logger` | `pino()` | Kendi pino instance'ınızı verebilirsiniz. |

> **Önemli:** Tüm dış servis çağrıları timeout + retry sarılı. Hata kategorisine göre
> retry edilir (network/408/429/5xx); 4xx hataları (auth, validation, not found)
> retry'lanmaz.

---

## Servisler

> **Tip stratejisi**
> - **Core servisler** (`products`, `orders`, `customers`, `coupons`, `refunds`) tam Zod
>   şemaları ile tipli — IDE auto-completion ve runtime validation hazır.
> - **Generic servisler** (`reports`, `tax`, `shipping`, `payments`, `webhooks`, `system`,
>   `settings`, `data`) `T` tip parametresi ile çağrılır; runtime validation YOKtur,
>   gerekirse caller kendi şemasıyla parse eder.

### Products

```ts
// Liste + sayfalama
const { data, meta } = await wc.products.list({
  per_page: 50,
  status: "publish",
  on_sale: true,
});

// Tüm ürünleri sırayla dolaş (otomatik sayfalama)
for await (const product of wc.products.iterate({ stock_status: "instock" })) {
  console.log(product.sku, product.name);
}

// Tek ürün
const product = await wc.products.get(42);

// Yeni ürün
const created = await wc.products.create({
  name: "Yeni Ürün",
  type: "simple",
  regular_price: "99.90",
  sku: "SKU-001",
});

// Güncelle
await wc.products.update(42, { regular_price: "89.90" });

// Sil (force=true → çöp kutusu yok, kalıcı sil)
await wc.products.delete(42, { force: true });

// Variations / Categories / Tags / Reviews
await wc.products.listVariations(42);
await wc.products.getVariation(42, 100);
await wc.products.listCategories();
await wc.products.listTags();
await wc.products.listReviews({ per_page: 20 });
```

### Orders

```ts
// Listeleme — birden çok status filtrelenebilir
const { data: orders } = await wc.orders.list({
  status: ["processing", "on-hold"],
  per_page: 100,
  after: "2026-01-01T00:00:00",
});

// Otomatik sayfalama
for await (const order of wc.orders.iterate({ status: "completed" })) {
  // ...
}

await wc.orders.get(123);

await wc.orders.create({
  status: "pending",
  payment_method: "bacs",
  payment_method_title: "Direct Bank Transfer",
  set_paid: false,
  billing: { first_name: "Ali", last_name: "Yıldız", email: "a@b.c" },
  shipping: { first_name: "Ali", last_name: "Yıldız" },
  line_items: [{ product_id: 42, quantity: 2 }],
} as never); // OrderCreateInput ile ek alanlar partial — gerekirse genişletilebilir.

await wc.orders.update(123, { status: "completed" });
await wc.orders.delete(123, { force: true });

// Sipariş notları
await wc.orders.listNotes(123);
await wc.orders.addNote(123, { note: "Kargo bugün çıkacak", customer_note: true });
await wc.orders.deleteNote(123, 555);
```

### Customers

```ts
const { data: customers } = await wc.customers.list({ per_page: 50 });

await wc.customers.get(7);

const c = await wc.customers.create({
  email: "ali@example.com",
  first_name: "Ali",
  last_name: "Yıldız",
  username: "ali",
  password: "geçici-şifre",
});

await wc.customers.update(c.id, { first_name: "Ali Can" });

// Müşterinin satın aldığı dijital indirilebilir ürünler
const downloads = await wc.customers.listDownloads(c.id);

// Sil + başka müşteriye reassign
await wc.customers.delete(c.id, { force: true, reassign: 1 });
```

### Coupons

```ts
await wc.coupons.create({
  code: "SUMMER20",
  discount_type: "percent",
  amount: "20",
  individual_use: true,
  exclude_sale_items: true,
  minimum_amount: "100.00",
});

await wc.coupons.list({ per_page: 100 });
await wc.coupons.get(123);
await wc.coupons.update(123, { amount: "25" });
await wc.coupons.delete(123, { force: true });
```

### Refunds

```ts
// Bir siparişin iadeleri
const { data } = await wc.refunds.list(100);

await wc.refunds.create(100, {
  amount: "25.00",
  reason: "Müşteri talebi",
  api_refund: false,   // true → ödeme gateway'i üzerinden iade
  api_restock: true,   // stoğu geri doldur
  line_items: [{ id: 12, quantity: 1, refund_total: 25 }],
});

await wc.refunds.get(100, 50);
await wc.refunds.delete(100, 50, { force: true });

// Cross-order: tüm refund'lar
await wc.refunds.listAll({ per_page: 100 });
```

### Reports

Generic typed — caller `T` parametresi ile dönüş tipini belirler.

```ts
type SalesRow = {
  total_sales: string;
  net_sales: string;
  total_orders: number;
  total_items: number;
  // ...
};

const sales = await wc.reports.sales<SalesRow[]>({ period: "week" });
const top = await wc.reports.topSellers({ period: "month" });

await wc.reports.orderTotals();
await wc.reports.productTotals();
await wc.reports.customerTotals();
await wc.reports.couponTotals();

// Custom report endpoint
await wc.reports.custom("/coupons", { period: "year" });
```

### Tax

```ts
// Tax classes
await wc.tax.listClasses();
await wc.tax.createClass({ name: "Reduced" });
await wc.tax.deleteClass("reduced");

// Tax rates
await wc.tax.listRates({ per_page: 100 });
await wc.tax.getRate(72);
await wc.tax.createRate({
  country: "TR",
  rate: "20.0000",
  name: "KDV",
  shipping: false,
});
await wc.tax.updateRate(72, { rate: "10.0000" });
await wc.tax.deleteRate(72, { force: true });
```

### Shipping

```ts
// Zones
await wc.shipping.listZones();
await wc.shipping.createZone({ name: "Türkiye", order: 1 });
await wc.shipping.updateZone(2, { order: 5 });

// Zone locations (replace semantics)
await wc.shipping.setZoneLocations(2, [
  { code: "TR", type: "country" },
]);

// Zone methods
await wc.shipping.listZoneMethods(2);
await wc.shipping.addZoneMethod(2, {
  method_id: "flat_rate",
  settings: { title: "Standart", cost: "29.90" },
});
await wc.shipping.deleteZoneMethod(2, 7);

// Mevcut shipping methods katalog
await wc.shipping.listMethods();
```

### Payments

```ts
// Tüm ödeme gateway'lerini listele
const gateways = await wc.payments.list();

// Bir gateway'in detayı
await wc.payments.get("bacs");

// Gateway ayarlarını güncelle (örn. aktif et)
await wc.payments.update("bacs", { enabled: true, title: "Banka Havalesi" });
```

### Webhooks

WooCommerce'teki webhook **kayıtlarını** yönetir. Webhook'ları **karşılayıp**
işlemek bu paketin kapsamı dışındadır — onun için ayrı bir handler gerekir.

```ts
await wc.webhooks.create({
  name: "Order created",
  topic: "order.created",
  delivery_url: "https://my-app.example.com/wc-webhooks",
  secret: "rastgele-uzun-string",
});

await wc.webhooks.list();
await wc.webhooks.get(1);
await wc.webhooks.update(1, { status: "paused" });
await wc.webhooks.delete(1, { force: true });
```

### System

```ts
// Mağazanın sürüm/yapılandırma bilgisi (debug için altın)
const status = await wc.system.status();

// Bakım araçları
await wc.system.listTools();
await wc.system.runTool("clear_transients");
```

### Settings

```ts
// Tüm gruplar
await wc.settings.listGroups();

// Bir grubun setting'leri
await wc.settings.listOptions("general");

// Tek setting
await wc.settings.getOption("general", "woocommerce_currency");
await wc.settings.updateOption("general", "woocommerce_currency", { value: "TRY" });

// Toplu update
await wc.settings.batchUpdate("general", {
  update: [
    { id: "woocommerce_currency", value: "TRY" },
    { id: "woocommerce_default_country", value: "TR:34" },
  ],
});
```

### Data

```ts
await wc.data.listContinents();
await wc.data.listCountries();
await wc.data.getCountry("TR");

await wc.data.listCurrencies();
await wc.data.getCurrency("TRY");
await wc.data.currentCurrency();
```

---

## Generic istek (`request<T>()`)

Servis sınıflarının kapsamadığı (veya plugin'lerin eklediği) endpoint'ler için:

```ts
type SubscriptionsRow = { id: number; status: string; total: string };

const subs = await wc.request<SubscriptionsRow[]>("GET", "/subscriptions", {
  query: { per_page: 50, status: "active" },
});

// Header'lar gerekiyorsa requestRaw
const raw = await wc.requestRaw<SubscriptionsRow[]>("GET", "/subscriptions");
console.log(raw.headers["x-wp-total"]);
```

`request<T>()` runtime parse YAPMAZ — `T` yalnızca compile-time
tip sağlar. Runtime doğrulama isteyenler caller tarafında Zod ile parse etmeli.

---

## Sayfalama

WooCommerce list endpoint'leri `?page=&per_page=` ile sayfalanır ve
`X-WP-Total` / `X-WP-TotalPages` header'larını döndürür.

```ts
// 1) Tek sayfa + meta
const { data, meta } = await wc.products.list({ per_page: 50, page: 2 });
meta.total;        // toplam item
meta.totalPages;   // toplam sayfa
meta.page;         // bu sayfa
meta.perPage;

// 2) Async iterator (otomatik tüm sayfalar)
for await (const product of wc.products.iterate({ per_page: 100 })) {
  // ...
}

// 3) Generic endpoint için manuel pagination helper
import { paginate } from "woocommerce-client";

for await (const sub of paginate(async (page) => {
  const raw = await wc.requestRaw<unknown[]>("GET", "/subscriptions", {
    query: { page, per_page: 50 },
  });
  return {
    data: raw.body as Subscription[],
    meta: {
      total: Number(raw.headers["x-wp-total"] ?? 0),
      totalPages: Number(raw.headers["x-wp-totalpages"] ?? 0),
      page,
      perPage: 50,
    },
  };
})) {
  // ...
}
```

---

## Hata yönetimi

Tüm hatalar `WooError` hiyerarşisinden türer:

| Sınıf | Ne zaman | HTTP |
|-------|----------|------|
| `WooAuthError` | Anahtar yanlış / izin yok | 401, 403 |
| `WooNotFoundError` | Kaynak bulunamadı | 404 |
| `WooValidationError` | Geçersiz input ya da Zod parse hatası | 400, 422 |
| `WooRateLimitError` | Rate limit (`retryAfter` field'ı var) | 429 |
| `WooServerError` | WC/WP sunucu hatası | 5xx |
| `WooNetworkError` | Network / timeout / connection reset | — |
| `WooError` (base) | Diğer her şey | — |

```ts
import {
  WooAuthError,
  WooNotFoundError,
  WooRateLimitError,
  WooValidationError,
} from "woocommerce-client";

try {
  await wc.products.get(999);
} catch (err) {
  if (err instanceof WooNotFoundError) {
    console.log("Ürün yok");
  } else if (err instanceof WooAuthError) {
    console.error("API key kontrol et");
  } else if (err instanceof WooRateLimitError) {
    console.warn(`Rate limited, ${err.retryAfter}s sonra tekrar dene`);
  } else if (err instanceof WooValidationError) {
    console.error("Validation:", err.message, err.body);
  } else {
    throw err;
  }
}
```

Her hata `endpoint`, `method`, `status`, `code` (WooCommerce error code), ve
ham `body` field'larını taşır — debug ve log için.

---

## Logger

Default olarak `pino` ile structured JSON log üretilir.

```ts
import { createLogger } from "woocommerce-client";

const wc = new WooCommerceClient({
  url: "...",
  consumerKey: "...",
  consumerSecret: "...",
  logger: createLogger({ level: "debug" }),
});

// Sessiz mod
const silent = createLogger({ level: "silent" });
```

`WC_LOG_LEVEL` env var (`info`, `warn`, `error`, `debug`, `trace`, `silent`) default
seviyeyi override eder.

---

## Test

`vitest` + `undici.MockAgent` ile gerçek API'ye istek atılmadan test edilir.

```bash
pnpm test          # tek seferlik
pnpm test:watch    # değişiklik takibi
pnpm test:coverage # coverage raporu
```

Yeni servis veya endpoint eklediğinizde lütfen test de ekleyin.

---

## Geliştirme

```bash
pnpm install
pnpm typecheck     # TypeScript kontrolü
pnpm lint          # ESLint
pnpm format        # Prettier
pnpm build         # dist/ üretir
```

Klasör yapısı:

```
src/
├── client.ts            ← WooCommerceClient (tüm resource'ları takıyor)
├── http.ts              ← undici tabanlı request + retry
├── auth.ts              ← Basic Auth header
├── errors.ts            ← WooError hiyerarşisi
├── logger.ts            ← pino factory
├── pagination.ts        ← X-WP-Total parser + async iterator
├── types/common.ts
├── resources/
│   ├── products.ts      (zod tipli core)
│   ├── orders.ts
│   ├── customers.ts
│   ├── coupons.ts
│   ├── refunds.ts
│   ├── reports.ts       (generic)
│   ├── tax.ts
│   ├── shipping.ts
│   ├── payments.ts
│   ├── webhooks.ts
│   ├── system.ts
│   ├── settings.ts
│   └── data.ts
└── index.ts             ← Public exports
```

---

## Sıkça sorulanlar

### Neden HTTP store URL'i reddediliyor?

WooCommerce, HTTPS dışı mağazalarda Basic Auth desteklemez (kimlik bilgileri açık
gider). Bu paket de aynı politikayı uygular. HTTP'li bir staging/eski mağaza
kullanmanız gerekirse OAuth 1.0a desteği eklemeden bu pakette mümkün değildir —
bu özellik kapsam dışı bırakıldı.

### Neden bütün endpoint'ler için Zod şeması yok?

WooCommerce 200+ endpoint sunuyor ve bir kısmının shape'i kullanım örneğine göre
değişiyor. **Pareto dağılımına** uyduk: yoğun kullanılan core kaynaklar (Products,
Orders, Customers, Coupons, Refunds) tam Zod ile tipli; geri kalan tüm servisler
generic `request<T>()` paterniyle erişilebilir. Zod'a gerçekten ihtiyacınız varsa
caller tarafında ekleyebilirsiniz:

```ts
import { z } from "zod";

const SubSchema = z.object({ id: z.number(), status: z.string() });
const raw = await wc.request<unknown>("GET", "/subscriptions");
const subs = z.array(SubSchema).parse(raw);
```

### Webhook'ları karşılayabilir miyim?

Hayır, bu paket **sadece giden REST client**. Webhook handler ileride ayrı bir
paket olarak eklenebilir. Şimdilik Express/Fastify ile kendiniz parse edip
HMAC imzasını doğrulamanız gerekir.

### Çok büyük listede `iterate()` mi yoksa `list()` mi?

Memory hassas senaryolarda `iterate()` (her sayfayı stream'ler).
Tüm veriyi belleğe almak isterseniz:

```ts
const all = [];
for await (const p of wc.products.iterate()) all.push(p);
```

### Plugin endpoint'lerine nasıl ulaşırım (örn. Subscriptions, Bookings)?

`wc.request<T>("GET", "/subscriptions")` ile direkt çağırın. Plugin'in
sahibi/dokümantasyonu shape'i belirler — caller tarafında Zod ile parse edebilirsiniz.

---

## Lisans

[MIT](LICENSE)
