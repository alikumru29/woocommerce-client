/**
 * Data resource — generic typed.
 *
 * Statik referans veriler: ülkeler, kıtalar, para birimleri, mevcut current.
 * Endpoints: https://woocommerce.github.io/woocommerce-rest-api-docs/#data
 */
export class DataService {
    client;
    constructor(client) {
        this.client = client;
    }
    /** Mevcut data endpoint'lerini listeler. */
    index(options) {
        return this.client.request("GET", "/data", options);
    }
    // --- Continents ---
    listContinents(options) {
        return this.client.request("GET", "/data/continents", options);
    }
    getContinent(code, options) {
        return this.client.request("GET", `/data/continents/${code}`, options);
    }
    // --- Countries ---
    listCountries(options) {
        return this.client.request("GET", "/data/countries", options);
    }
    getCountry(code, options) {
        return this.client.request("GET", `/data/countries/${code}`, options);
    }
    // --- Currencies ---
    listCurrencies(options) {
        return this.client.request("GET", "/data/currencies", options);
    }
    getCurrency(code, options) {
        return this.client.request("GET", `/data/currencies/${code}`, options);
    }
    /** Mağazanın aktif para birimi. */
    currentCurrency(options) {
        return this.client.request("GET", "/data/currencies/current", options);
    }
}
//# sourceMappingURL=data.js.map