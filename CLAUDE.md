# woocommerce-client — Agent Kuralları

Bu repo **standalone** bir TypeScript paketidir. Monorepo'nun parçası DEĞİL — kendi `.git`'i var, GitHub'a ayrı yayınlanır.

## Kapsam

- **Sadece giden REST client.** WooCommerce REST API v3 (`/wp-json/wc/v3`) endpoint'lerine istek atar.
- **Library only.** `import { WooCommerceClient } from "woocommerce-client"` ile kullanılır. HTTP servisi YOK.
- **Auth: HTTPS Basic Auth.** Consumer Key + Consumer Secret. OAuth 1.0a desteklenmez.

## Stack

- TypeScript (strict) · Node 20+ · ESM
- `undici` (HTTP) · `zod` (validation) · `pino` (log)
- `vitest` (test) · `eslint` + `@typescript-eslint` · `prettier`

## Tip Stratejisi (önemli)

İki kategori var:

1. **Core resources** — `products`, `orders`, `customers`, `coupons`, `refunds`. Tam zod şemaları ile tipli. Yeni alan eklerken şemayı da güncelle.
2. **Generic resources** — `reports`, `tax`, `shipping`, `payments`, `webhooks`, `system`, `settings`, `data`. `client.request<T>()` ile generic çağrı, dönüş tipi caller tarafından belirlenir. Zod parse YAPMAZ; çağıran isterse kendi şemasıyla parse eder.

## Kod Kuralları

- `any` yasak. `unknown` + zod parse zorunlu (response body parse'larında).
- `console.log` yasak. `pino` logger kullan; sessiz mod için `silent` level.
- Hata fırlatırken `WooError` hiyerarşisini (`src/errors.ts`) kullan; ham `Error` atma.
- Tüm dış istekler timeout + retry sarmalı; kullanıcı override edebilir.
- Secret'lar `.env.example` ile dokümante. Production secret loglanmaz, commit'lenmez.
- Public her sınıf/fonksiyon için JSDoc (Türkçe açıklama OK; örnek kod faydalı).

## Test Kuralı

- Gerçek WooCommerce mağazasına çağrı YOK. `undici.MockAgent` ile mock'la.
- En az core resource'ların happy path + error path testleri olsun.
- Yeni feature → en az bir `*.test.ts`.

## Yeni Resource Eklerken

1. `src/resources/<name>.ts` — sınıf, zod şeması (core ise)
2. `src/client.ts` içinde `client.<name>` property eklenmeli
3. `src/index.ts`'ten tipler export edilmeli
4. `test/resources/<name>.test.ts` — mock'lu test
5. README'ye kullanım örneği

## Yapma

- ❌ HTTP server (express/fastify) ekleme — library only.
- ❌ OAuth 1.0a auth ekleme — kullanıcı istemedi.
- ❌ Webhook handler ekleme — bu repo sadece giden REST.
- ❌ `console.log` veya `console.error` bırakma.
- ❌ Yeni dependency eklemeden önce kullanıcıya sor.
