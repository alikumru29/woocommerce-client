import type { WooCommerceClient } from "../client.js";
import type { RequestOptions } from "../types/common.js";
/**
 * System Status resource — generic typed.
 *
 * Endpoints: https://woocommerce.github.io/woocommerce-rest-api-docs/#system-status
 */
export declare class SystemService {
    private readonly client;
    constructor(client: WooCommerceClient);
    /** Sunucu/WP/WooCommerce sürümleri ve yapılandırma bilgisi. */
    status<T = unknown>(options?: RequestOptions): Promise<T>;
    /** Mevcut bakım araçları. */
    listTools<T = unknown>(options?: RequestOptions): Promise<T>;
    /** Bir bakım aracının detayı. */
    getTool<T = unknown>(id: string, options?: RequestOptions): Promise<T>;
    /** Bakım aracını çalıştırır. */
    runTool<T = unknown>(id: string, options?: RequestOptions): Promise<T>;
}
//# sourceMappingURL=system.d.ts.map