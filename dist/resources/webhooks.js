/**
 * Webhooks resource — generic typed.
 *
 * NOT: Bu sınıf yalnızca WooCommerce'teki webhook KAYITLARINI yönetir
 * (CRUD). Webhook'ları KARŞILAYIP işleme bu repo'nun kapsamı dışında —
 * o iş için ayrı bir handler servisi gerekir.
 *
 * Endpoints: https://woocommerce.github.io/woocommerce-rest-api-docs/#webhooks
 */
export class WebhooksService {
    client;
    constructor(client) {
        this.client = client;
    }
    list(query = {}, options) {
        return this.client.request("GET", "/webhooks", { query, ...options });
    }
    get(id, options) {
        return this.client.request("GET", `/webhooks/${id}`, options);
    }
    create(input, options) {
        return this.client.request("POST", "/webhooks", { body: input, ...options });
    }
    update(id, input, options) {
        return this.client.request("PUT", `/webhooks/${id}`, { body: input, ...options });
    }
    delete(id, opts = {}, options) {
        return this.client.request("DELETE", `/webhooks/${id}`, {
            query: opts.force ? { force: true } : undefined,
            ...options,
        });
    }
}
//# sourceMappingURL=webhooks.js.map