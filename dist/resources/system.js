/**
 * System Status resource — generic typed.
 *
 * Endpoints: https://woocommerce.github.io/woocommerce-rest-api-docs/#system-status
 */
export class SystemService {
    client;
    constructor(client) {
        this.client = client;
    }
    /** Sunucu/WP/WooCommerce sürümleri ve yapılandırma bilgisi. */
    status(options) {
        return this.client.request("GET", "/system_status", options);
    }
    /** Mevcut bakım araçları. */
    listTools(options) {
        return this.client.request("GET", "/system_status/tools", options);
    }
    /** Bir bakım aracının detayı. */
    getTool(id, options) {
        return this.client.request("GET", `/system_status/tools/${id}`, options);
    }
    /** Bakım aracını çalıştırır. */
    runTool(id, options) {
        return this.client.request("PUT", `/system_status/tools/${id}`, options);
    }
}
//# sourceMappingURL=system.js.map