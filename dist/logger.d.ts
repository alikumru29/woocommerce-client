import { type Logger, type LoggerOptions } from "pino";
/**
 * Paket geneli logger factory.
 *
 * Kullanıcı kendi pino instance'ını verebilir; vermezse default oluşturulur.
 * Sessizlik için `level: "silent"` kullanılabilir.
 */
export declare function createLogger(options?: LoggerOptions): Logger;
export type { Logger };
//# sourceMappingURL=logger.d.ts.map