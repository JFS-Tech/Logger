import { LogLevel } from "./log-level";
import { LogMessage, LogMeta } from "./logging";

export interface Logger {
	/**
	 * Get source(~operation) name.
	 *
	 * @since 0.0.1
	 */
	getSource(): string | undefined;

	/**
	 * Create new logger instance that inherit these below properties from its parent:
	 * - Source name(If no source name is provided, it will use source name from parent logger).
	 * - Meta(It will combine with parent logger meta to create new meta).
	 *
	 * @since 0.0.1
	 */
	from(source: string, meta?: LogMeta): Logger;

	/**
	 * By default, the log level is inherited from the parent logger. This method allows
	 * you to set the log level for the current logger instance.
	 *
	 * @since 0.0.1
	 */
	setLogLevel(level: LogLevel): void;

	/**
	 * Get log level of current logger instance.
	 *
	 * @since 0.0.1
	 */
	getLogLevel(): LogLevel;

	/**
	 * @since 0.0.1
	 */
	setMeta(k: string, v: any): void;

	/**
	 * Get meta by key. If the key is not provided, it will return all meta.
	 *
	 * @since 0.0.1
	 */
	getMeta(k?: string): any;

	/**
	 * @since 0.0.1
	 */
	debug(message: LogMessage, meta?: LogMeta): void;

	/**
	 * @since 0.0.1
	 */
	info(message: LogMessage, meta?: LogMeta): void;

	/**
	 * @since 0.0.1
	 */
	warn(message: LogMessage, meta?: LogMeta): void;

	/**
	 * @since 0.0.1
	 */
	error(message: LogMessage, meta?: LogMeta): void;

	/**
	 * @since 0.0.1
	 */
	fatal(message: LogMessage, meta?: LogMeta): void;

	/**
	 * _Usage:_
	 * ```ts
	 * import { LogLevel } from '@jfstech/logger';
	 *
	 * logInstance.log(LogLevel.INFO, 'We have just did something');
	 *
	 * // equal to:
	 *
	 * logInstance.info('We have just did something');
	 * ```
	 *
	 * @since 0.0.1
	 */
	log(level: LogLevel, msg: LogMessage, meta?: LogMeta): void;
}
