/**
 * Payment Gateways resource — generic typed.
 *
 * Endpoints: https://woocommerce.github.io/woocommerce-rest-api-docs/#payment-gateways
 */
export class PaymentGatewaysService {
    client;
    constructor(client) {
        this.client = client;
    }
    list(options) {
        return this.client.request("GET", "/payment_gateways", options);
    }
    get(id, options) {
        return this.client.request("GET", `/payment_gateways/${id}`, options);
    }
    update(id, input, options) {
        return this.client.request("PUT", `/payment_gateways/${id}`, {
            body: input,
            ...options,
        });
    }
}
//# sourceMappingURL=payments.js.map