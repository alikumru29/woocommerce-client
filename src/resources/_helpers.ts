import { z } from "zod";
import { WooValidationError } from "../errors.js";

/**
 * Tek bir response'u zod ile parse eder. Hata varsa `WooValidationError` atar.
 */
export function parseOne<T>(schema: z.ZodType<T>, body: unknown, endpoint: string): T {
  const result = schema.safeParse(body);
  if (!result.success) {
    throw new WooValidationError(`Invalid response shape for ${endpoint}`, {
      endpoint,
      cause: result.error,
      body,
    });
  }
  return result.data;
}

/**
 * Bir array response'unun her item'ını zod ile parse eder.
 */
export function parseArray<T>(schema: z.ZodType<T>, body: unknown, endpoint: string): T[] {
  if (!Array.isArray(body)) {
    throw new WooValidationError(`Expected array response from ${endpoint}`, { endpoint, body });
  }
  return body.map((item, idx) => {
    const result = schema.safeParse(item);
    if (!result.success) {
      throw new WooValidationError(`Invalid item at index ${idx} from ${endpoint}`, {
        endpoint,
        cause: result.error,
        body: item,
      });
    }
    return result.data;
  });
}
