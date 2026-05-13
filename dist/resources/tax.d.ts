import type { WooCommerceClient } from "../client.js";
import type { ListQuery, RequestOptions } from "../types/common.js";
/**
 * Tax resource — generic typed.
 *
 * Kapsama: tax classes (`/taxes/classes`) + tax rates (`/taxes`).
 * Endpoints: https://woocommerce.github.io/woocommerce-rest-api-docs/#tax-classes
 *            https://woocommerce.github.io/woocommerce-rest-api-docs/#tax-rates
 */
export declare class TaxService {
    private readonly client;
    constructor(client: WooCommerceClient);
    listClasses<T = unknown>(options?: RequestOptions): Promise<T>;
    createClass<T = unknown>(input: {
        name: string;
    }, options?: RequestOptions): Promise<T>;
    deleteClass<T = unknown>(slug: string, options?: RequestOptions): Promise<T>;
    listRates<T = unknown>(query?: ListQuery, options?: RequestOptions): Promise<T>;
    getRate<T = unknown>(id: number, options?: RequestOptions): Promise<T>;
    createRate<T = unknown>(input: Record<string, unknown>, options?: RequestOptions): Promise<T>;
    updateRate<T = unknown>(id: number, input: Record<string, unknown>, options?: RequestOptions): Promise<T>;
    deleteRate<T = unknown>(id: number, opts?: {
        force?: boolean;
    }, options?: RequestOptions): Promise<T>;
}
//# sourceMappingURL=tax.d.ts.map