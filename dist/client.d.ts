import { type Dispatcher } from "undici";
import { type AuthMethod } from "./auth.js";
import { type HttpMethod, type HttpResponse } from "./http.js";
import { type Logger } from "./logger.js";
import { CouponsService } from "./resources/coupons.js";
import { CustomersService } from "./resources/customers.js";
import { DataService } from "./resources/data.js";
import { OrdersService } from "./resources/orders.js";
import { PaymentGatewaysService } from "./resources/payments.js";
import { ProductsService } from "./resources/products.js";
import { RefundsService } from "./resources/refunds.js";
import { ReportsService } from "./resources/reports.js";
import { SettingsService } from "./resources/settings.js";
import { ShippingService } from "./resources/shipping.js";
import { SystemService } from "./resources/system.js";
import { TaxService } from "./resources/tax.js";
import { WebhooksService } from "./resources/webhooks.js";
import type { RequestOptions } from "./types/common.js";
/** WooCommerce REST API sürüm path'leri. */
export type WooApiVersion = "wc/v3" | "wc/v2" | "wc/v1";
/** WooCommerceClient constructor opts. */
export interface WooCommerceClientConfig {
    /** Mağaza URL'i (örn. "https://store.example.com"). HTTPS zorunlu. */
    url: string;
    /** Consumer Key (ck_...). */
    consumerKey: string;
    /** Consumer Secret (cs_...). */
    consumerSecret: string;
    /**
     * Auth metodu. WooCommerce ikisini de resmi olarak destekler:
     *
     * - `"query"` (default) — credentials URL query string'inde gider. Authorization
     *   header gönderilmez; Cloudflare/managed-host WAF kuralları (Basic-Auth pattern
     *   match) tetiklenmez. Üretim ortamlarında tercih edilen.
     * - `"basic"` — klasik HTTP Basic Authentication header. Cloudflare arkası olmayan
     *   mağazalar için tercih edilebilir.
     */
    authMethod?: AuthMethod;
    /** API sürümü. Default: "wc/v3". */
    version?: WooApiVersion;
    /** Default istek timeout (ms). Default: 30000. */
    timeout?: number;
    /** Network/5xx/429 için retry sayısı. Default: 3. */
    retries?: number;
    /** İlk retry'a kadar bekleme (ms). Default: 500. */
    retryBaseDelay?: number;
    /** Maksimum retry bekleme (ms). Default: 30000. */
    retryMaxDelay?: number;
    /** Custom pino logger. Default: paket logger'ı. */
    logger?: Logger;
    /** undici dispatcher (test için MockAgent vb.). */
    dispatcher?: Dispatcher;
}
/** Generic request opts (request<T>() için). */
export interface GenericRequestOptions extends RequestOptions {
    /** Query string param'ları. */
    query?: Record<string, unknown>;
    /** JSON body. */
    body?: unknown;
}
/**
 * WooCommerce REST API client.
 *
 * Kullanım:
 * ```ts
 * const wc = new WooCommerceClient({
 *   url: "https://store.example.com",
 *   consumerKey: "ck_xxx",
 *   consumerSecret: "cs_xxx",
 * });
 *
 * const products = await wc.products.list({ per_page: 50 });
 * const order = await wc.orders.get(123);
 * ```
 *
 * Tipsiz endpoint'ler için `wc.request<T>()` kullanılabilir.
 */
export declare class WooCommerceClient {
    private readonly baseUrl;
    private readonly authMethod;
    private readonly authHeader;
    private readonly consumerKey;
    private readonly consumerSecret;
    private readonly httpConfig;
    readonly products: ProductsService;
    readonly orders: OrdersService;
    readonly customers: CustomersService;
    readonly coupons: CouponsService;
    readonly refunds: RefundsService;
    readonly reports: ReportsService;
    readonly tax: TaxService;
    readonly shipping: ShippingService;
    readonly payments: PaymentGatewaysService;
    readonly webhooks: WebhooksService;
    readonly system: SystemService;
    readonly settings: SettingsService;
    readonly data: DataService;
    constructor(config: WooCommerceClientConfig);
    /**
     * Generic request. Dönüş tipi `T` caller tarafından sağlanmalıdır;
     * runtime parse YAPILMAZ. Validation gerekiyorsa caller kendi zod şemasıyla parse etsin.
     *
     * @example
     * const sales = await wc.request<SalesReport[]>("GET", "/reports/sales");
     */
    request<T = unknown>(method: HttpMethod, path: string, options?: GenericRequestOptions): Promise<T>;
    /**
     * Generic request — header'lara erişim gerektiğinde (örn. pagination) kullanılır.
     */
    requestRaw<T = unknown>(method: HttpMethod, path: string, options?: GenericRequestOptions): Promise<HttpResponse<T>>;
    /** Base URL ve path'i birleştirir, query string'i ekler, query auth modunda credentials'ı iliştirir. */
    private buildUrl;
}
//# sourceMappingURL=client.d.ts.map