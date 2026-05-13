/**
 * Tax resource — generic typed.
 *
 * Kapsama: tax classes (`/taxes/classes`) + tax rates (`/taxes`).
 * Endpoints: https://woocommerce.github.io/woocommerce-rest-api-docs/#tax-classes
 *            https://woocommerce.github.io/woocommerce-rest-api-docs/#tax-rates
 */
export class TaxService {
    client;
    constructor(client) {
        this.client = client;
    }
    // --- Tax Classes ---
    listClasses(options) {
        return this.client.request("GET", "/taxes/classes", options);
    }
    createClass(input, options) {
        return this.client.request("POST", "/taxes/classes", { body: input, ...options });
    }
    deleteClass(slug, options) {
        return this.client.request("DELETE", `/taxes/classes/${slug}`, {
            query: { force: true },
            ...options,
        });
    }
    // --- Tax Rates ---
    listRates(query = {}, options) {
        return this.client.request("GET", "/taxes", { query, ...options });
    }
    getRate(id, options) {
        return this.client.request("GET", `/taxes/${id}`, options);
    }
    createRate(input, options) {
        return this.client.request("POST", "/taxes", { body: input, ...options });
    }
    updateRate(id, input, options) {
        return this.client.request("PUT", `/taxes/${id}`, { body: input, ...options });
    }
    deleteRate(id, opts = {}, options) {
        return this.client.request("DELETE", `/taxes/${id}`, {
            query: opts.force ? { force: true } : undefined,
            ...options,
        });
    }
}
//# sourceMappingURL=tax.js.map