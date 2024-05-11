import { LogMeta } from "../logging";
import { Logger } from "../logging";

/**
 * This interface allow other libraries to override default logger(`SimpleLogger`).
 *
 * ```ts
 * // Sample usage:
 * import { setLoggerFactory, LoggerFactory, Logger, getLogger, LogMeta } from '@jfstech/logger';
 *
 * class YourLogger implements Logger {
 *   // ...
 * }
 *
 * class YourLoggerFactory implements LoggerFactory {
 *   getLogger(source?: string, meta?: LogMeta): Logger {
 *     return new YourLogger(source, meta);
 *   }
 * }
 *
 * setLoggerFactory(new YourLoggerFactory());
 *
 * getLogger(); // YourLogger instance
 * ```
 * @since 0.0.1
 */
export interface LoggerFactory {
	/**
	 * Get new logger that inherit these below properties from current active logger:
	 * - Source name(If no source name is provided, it will use source name from parent logger).
	 * - Meta(It will combine with parent logger meta to create new meta).
	 *
	 * @param source Source/Operation name(eg: 'User:RegisterCmd', 'TypeOrmModule',...).
	 * - Meta(It will combine with parent logger meta to create a new meta).
	 * @since 0.0.1
	 */
	getLogger(source?: string, meta?: LogMeta, showTimestamp?: boolean, showSource?: boolean): Logger;
}
