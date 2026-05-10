import type { WooCommerceClient } from "../client.js";
import type { RequestOptions } from "../types/common.js";

/**
 * Data resource — generic typed.
 *
 * Statik referans veriler: ülkeler, kıtalar, para birimleri, mevcut current.
 * Endpoints: https://woocommerce.github.io/woocommerce-rest-api-docs/#data
 */

export class DataService {
  constructor(private readonly client: WooCommerceClient) {}

  /** Mevcut data endpoint'lerini listeler. */
  index<T = unknown>(options?: RequestOptions): Promise<T> {
    return this.client.request<T>("GET", "/data", options);
  }

  // --- Continents ---

  listContinents<T = unknown>(options?: RequestOptions): Promise<T> {
    return this.client.request<T>("GET", "/data/continents", options);
  }

  getContinent<T = unknown>(code: string, options?: RequestOptions): Promise<T> {
    return this.client.request<T>("GET", `/data/continents/${code}`, options);
  }

  // --- Countries ---

  listCountries<T = unknown>(options?: RequestOptions): Promise<T> {
    return this.client.request<T>("GET", "/data/countries", options);
  }

  getCountry<T = unknown>(code: string, options?: RequestOptions): Promise<T> {
    return this.client.request<T>("GET", `/data/countries/${code}`, options);
  }

  // --- Currencies ---

  listCurrencies<T = unknown>(options?: RequestOptions): Promise<T> {
    return this.client.request<T>("GET", "/data/currencies", options);
  }

  getCurrency<T = unknown>(code: string, options?: RequestOptions): Promise<T> {
    return this.client.request<T>("GET", `/data/currencies/${code}`, options);
  }

  /** Mağazanın aktif para birimi. */
  currentCurrency<T = unknown>(options?: RequestOptions): Promise<T> {
    return this.client.request<T>("GET", "/data/currencies/current", options);
  }
}
