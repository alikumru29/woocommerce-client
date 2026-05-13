import { appendQueryAuth, assertHttpsUrl, buildBasicAuthHeader, } from "./auth.js";
import { executeRequest } from "./http.js";
import { createLogger } from "./logger.js";
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
export class WooCommerceClient {
    baseUrl;
    authMethod;
    authHeader;
    consumerKey;
    consumerSecret;
    httpConfig;
    // Core resources (zod tipli).
    products;
    orders;
    customers;
    coupons;
    refunds;
    // Generic resources.
    reports;
    tax;
    shipping;
    payments;
    webhooks;
    system;
    settings;
    data;
    constructor(config) {
        const url = assertHttpsUrl(config.url);
        this.consumerKey = config.consumerKey;
        this.consumerSecret = config.consumerSecret;
        this.authMethod = config.authMethod ?? "query";
        // Basic mode için header'ı önceden hesaplayalım. Query mode'da boş.
        this.authHeader =
            this.authMethod === "basic"
                ? buildBasicAuthHeader({
                    consumerKey: config.consumerKey,
                    consumerSecret: config.consumerSecret,
                })
                : "";
        const version = config.version ?? "wc/v3";
        // /wp-json/<version> base path. URL'in path'i varsa korunur.
        const trimmedPath = url.pathname.replace(/\/$/, "");
        this.baseUrl = `${url.origin}${trimmedPath}/wp-json/${version}`;
        this.httpConfig = {
            timeout: config.timeout ?? 30_000,
            retries: config.retries ?? 3,
            retryBaseDelay: config.retryBaseDelay ?? 500,
            retryMaxDelay: config.retryMaxDelay ?? 30_000,
            logger: config.logger ?? createLogger(),
            dispatcher: config.dispatcher,
        };
        // Resource servislerini bu client'a bağla.
        this.products = new ProductsService(this);
        this.orders = new OrdersService(this);
        this.customers = new CustomersService(this);
        this.coupons = new CouponsService(this);
        this.refunds = new RefundsService(this);
        this.reports = new ReportsService(this);
        this.tax = new TaxService(this);
        this.shipping = new ShippingService(this);
        this.payments = new PaymentGatewaysService(this);
        this.webhooks = new WebhooksService(this);
        this.system = new SystemService(this);
        this.settings = new SettingsService(this);
        this.data = new DataService(this);
    }
    /**
     * Generic request. Dönüş tipi `T` caller tarafından sağlanmalıdır;
     * runtime parse YAPILMAZ. Validation gerekiyorsa caller kendi zod şemasıyla parse etsin.
     *
     * @example
     * const sales = await wc.request<SalesReport[]>("GET", "/reports/sales");
     */
    async request(method, path, options = {}) {
        const response = await this.requestRaw(method, path, options);
        return response.body;
    }
    /**
     * Generic request — header'lara erişim gerektiğinde (örn. pagination) kullanılır.
     */
    async requestRaw(method, path, options = {}) {
        const url = this.buildUrl(path, options.query);
        return executeRequest({
            method,
            url,
            body: options.body,
            authHeader: this.authHeader,
            timeout: options.timeout,
            retries: options.retries,
            headers: options.headers,
            signal: options.signal,
        }, this.httpConfig);
    }
    /** Base URL ve path'i birleştirir, query string'i ekler, query auth modunda credentials'ı iliştirir. */
    buildUrl(path, query) {
        const cleanPath = path.startsWith("/") ? path : `/${path}`;
        const url = new URL(`${this.baseUrl}${cleanPath}`);
        if (query) {
            for (const [key, value] of Object.entries(query)) {
                if (value === undefined || value === null)
                    continue;
                if (Array.isArray(value)) {
                    for (const v of value)
                        url.searchParams.append(key, String(v));
                }
                else if (typeof value === "object") {
                    url.searchParams.set(key, JSON.stringify(value));
                }
                else {
                    url.searchParams.set(key, String(value));
                }
            }
        }
        let urlString = url.toString();
        if (this.authMethod === "query") {
            urlString = appendQueryAuth(urlString, {
                consumerKey: this.consumerKey,
                consumerSecret: this.consumerSecret,
            });
        }
        return urlString;
    }
}
//# sourceMappingURL=client.js.map