import type { WooCommerceClient } from "../client.js";
import type { RequestOptions } from "../types/common.js";
/**
 * Settings resource — generic typed.
 *
 * WooCommerce ayarları gruplara ayrılmıştır (general, products, tax, ...).
 * Her grup birden çok setting içerir.
 *
 * Endpoints: https://woocommerce.github.io/woocommerce-rest-api-docs/#settings
 */
export declare class SettingsService {
    private readonly client;
    constructor(client: WooCommerceClient);
    /** Tüm setting gruplarını listeler. */
    listGroups<T = unknown>(options?: RequestOptions): Promise<T>;
    /** Bir gruptaki tüm setting'leri listeler. */
    listOptions<T = unknown>(groupId: string, options?: RequestOptions): Promise<T>;
    /** Tek bir setting'i okur. */
    getOption<T = unknown>(groupId: string, optionId: string, options?: RequestOptions): Promise<T>;
    /** Tek bir setting'i günceller. */
    updateOption<T = unknown>(groupId: string, optionId: string, input: {
        value: unknown;
    }, options?: RequestOptions): Promise<T>;
    /** Bir gruptaki birden çok setting'i topluca günceller (batch). */
    batchUpdate<T = unknown>(groupId: string, input: {
        update?: Array<{
            id: string;
            value: unknown;
        }>;
    }, options?: RequestOptions): Promise<T>;
}
//# sourceMappingURL=settings.d.ts.map