import type { WooCommerceClient } from "../client.js";
import type { ListQuery, RequestOptions } from "../types/common.js";
/**
 * Webhooks resource — generic typed.
 *
 * NOT: Bu sınıf yalnızca WooCommerce'teki webhook KAYITLARINI yönetir
 * (CRUD). Webhook'ları KARŞILAYIP işleme bu repo'nun kapsamı dışında —
 * o iş için ayrı bir handler servisi gerekir.
 *
 * Endpoints: https://woocommerce.github.io/woocommerce-rest-api-docs/#webhooks
 */
export declare class WebhooksService {
    private readonly client;
    constructor(client: WooCommerceClient);
    list<T = unknown>(query?: ListQuery, options?: RequestOptions): Promise<T>;
    get<T = unknown>(id: number, options?: RequestOptions): Promise<T>;
    create<T = unknown>(input: {
        name?: string;
        topic: string;
        delivery_url: string;
        secret?: string;
        status?: "active" | "paused" | "disabled";
    }, options?: RequestOptions): Promise<T>;
    update<T = unknown>(id: number, input: Record<string, unknown>, options?: RequestOptions): Promise<T>;
    delete<T = unknown>(id: number, opts?: {
        force?: boolean;
    }, options?: RequestOptions): Promise<T>;
}
//# sourceMappingURL=webhooks.d.ts.map