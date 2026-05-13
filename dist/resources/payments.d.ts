import type { WooCommerceClient } from "../client.js";
import type { RequestOptions } from "../types/common.js";
/**
 * Payment Gateways resource — generic typed.
 *
 * Endpoints: https://woocommerce.github.io/woocommerce-rest-api-docs/#payment-gateways
 */
export declare class PaymentGatewaysService {
    private readonly client;
    constructor(client: WooCommerceClient);
    list<T = unknown>(options?: RequestOptions): Promise<T>;
    get<T = unknown>(id: string, options?: RequestOptions): Promise<T>;
    update<T = unknown>(id: string, input: Record<string, unknown>, options?: RequestOptions): Promise<T>;
}
//# sourceMappingURL=payments.d.ts.map