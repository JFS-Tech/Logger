import { Logger } from "../logger";
import { LoggerFactory } from "../factory/logger-factory";
import { SimpleLogger } from "./simple-logger";
import { LogMeta } from "../logging";

/**
 * @since 0.0.1
 */
export class SimpleLoggerFactory implements LoggerFactory {
	private rootLogger = new SimpleLogger();

	/**
	 * @since 0.0.1
	 */
	getLogger(source: string, meta?: LogMeta, showTimestamp?: boolean, showSource?: boolean): Logger {
		const activeLogger: Logger = this.rootLogger;
		return activeLogger.from(source || activeLogger.getSource(), meta, showTimestamp, showSource);
	}
}
