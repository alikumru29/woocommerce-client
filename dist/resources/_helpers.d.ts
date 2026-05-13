import { z } from "zod";
/**
 * Tek bir response'u zod ile parse eder. Hata varsa `WooValidationError` atar.
 */
export declare function parseOne<T>(schema: z.ZodType<T>, body: unknown, endpoint: string): T;
/**
 * Bir array response'unun her item'ını zod ile parse eder.
 */
export declare function parseArray<T>(schema: z.ZodType<T>, body: unknown, endpoint: string): T[];
//# sourceMappingURL=_helpers.d.ts.map