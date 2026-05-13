import type { WooCommerceClient } from "../client.js";
import type { RequestOptions } from "../types/common.js";
/**
 * Data resource — generic typed.
 *
 * Statik referans veriler: ülkeler, kıtalar, para birimleri, mevcut current.
 * Endpoints: https://woocommerce.github.io/woocommerce-rest-api-docs/#data
 */
export declare class DataService {
    private readonly client;
    constructor(client: WooCommerceClient);
    /** Mevcut data endpoint'lerini listeler. */
    index<T = unknown>(options?: RequestOptions): Promise<T>;
    listContinents<T = unknown>(options?: RequestOptions): Promise<T>;
    getContinent<T = unknown>(code: string, options?: RequestOptions): Promise<T>;
    listCountries<T = unknown>(options?: RequestOptions): Promise<T>;
    getCountry<T = unknown>(code: string, options?: RequestOptions): Promise<T>;
    listCurrencies<T = unknown>(options?: RequestOptions): Promise<T>;
    getCurrency<T = unknown>(code: string, options?: RequestOptions): Promise<T>;
    /** Mağazanın aktif para birimi. */
    currentCurrency<T = unknown>(options?: RequestOptions): Promise<T>;
}
//# sourceMappingURL=data.d.ts.map