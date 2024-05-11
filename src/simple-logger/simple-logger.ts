import { LogLevel } from "../log-level";
import { LogMessage, LogMeta } from "../logging";
import { Logger } from "../logger";
import * as pc from "../utils/picocolours";

const logLevelName = {
	[LogLevel.DEBUG]: "DEBUG",
	[LogLevel.INFO]: "INFO",
	[LogLevel.WARN]: "WARN",
	[LogLevel.ERROR]: "ERROR",
	[LogLevel.FATAL]: "FATAL",
	[LogLevel.SUCCESS]: "SUCCESS",
	[LogLevel.TRACE]: "TRACE",
};

/**
 * JFS-Tech Simple Logger
 *
 * _Features:_
 * - support write log to console
 *
 * @since 0.0.1
 */
export class SimpleLogger implements Logger {
	private level: LogLevel = LogLevel.INFO;

	private logMethodMap = {
		[LogLevel.DEBUG]: this.debug.bind(this),
		[LogLevel.INFO]: this.info.bind(this),
		[LogLevel.WARN]: this.warn.bind(this),
		[LogLevel.ERROR]: this.error.bind(this),
		[LogLevel.FATAL]: this.fatal.bind(this),
		[LogLevel.SUCCESS]: this.success.bind(this),
		[LogLevel.TRACE]: this.trace.bind(this),
	};

	constructor(
		private source?: string,
		private meta: LogMeta = {},
		private showSource?: boolean,
		private showTimestamp?: boolean
	) {}

	getLogLevel(): LogLevel {
		return this.level;
	}

	setMeta(k: string, v: any): void {
		this.meta[k] = v;
	}

	getMeta(k?: string) {
		return k ? this.meta[k] : this.meta;
	}

	getSource(): string | undefined {
		return this.source;
	}

	from(source: string, meta?: LogMeta, showTimestamp?: boolean, showSource?: boolean): Logger {
		const newLogger = new SimpleLogger(source, { ...this.meta, ...meta });

		newLogger.setLogLevel(this.level);
		newLogger.setShowSource(showSource ?? this.showSource);
		newLogger.setShowTimestamp(showTimestamp ?? this.showTimestamp);

		return newLogger;
	}

	setLogLevel(level: LogLevel): void {
		this.level = level;
	}

	setShowSource(show: boolean): void {
		this.showSource = show;
	}

	setShowTimestamp(show: boolean): void {
		this.showTimestamp = show;
	}

	debug(msg: LogMessage, meta?: LogMeta): void {
		if (this.level < LogLevel.DEBUG) return;

		console.debug(this.format(LogLevel.DEBUG, msg, { ...this.meta, ...meta }));
	}

	info(msg: LogMessage, meta?: LogMeta): void {
		if (this.level < LogLevel.INFO) return;

		console.info(this.format(LogLevel.INFO, msg, { ...this.meta, ...meta }));
	}

	warn(msg: LogMessage, meta?: LogMeta): void {
		if (this.level < LogLevel.WARN) return;

		console.warn(this.format(LogLevel.WARN, msg, { ...this.meta, ...meta }));
	}

	error(msg: LogMessage, meta?: LogMeta): void {
		if (this.level < LogLevel.ERROR) return;

		console.error(this.format(LogLevel.ERROR, msg, { ...this.meta, ...meta }));
	}

	fatal(msg: LogMessage, meta?: LogMeta): void {
		console.error(this.format(LogLevel.FATAL, msg, { ...this.meta, ...meta }));
	}

	success(msg: LogMessage, meta?: LogMeta): void {
		console.log(this.format(LogLevel.SUCCESS, msg, { ...this.meta, ...meta }));
	}

	trace(msg: LogMessage, meta?: LogMeta): void {
		if (this.level < LogLevel.TRACE) return;

		console.trace(this.format(LogLevel.TRACE, msg, { ...this.meta, ...meta }));
	}

	log(level: LogLevel, msg: LogMessage, meta: LogMeta = {}): void {
		this.logMethodMap[level](msg, meta);
	}

	private format(level: LogLevel, msg: LogMessage, meta?: LogMeta) {
		const ts = this.showTimestamp ? new Date().toLocaleTimeString() : "";
		const source = this.source && this.showSource ? ` | ${this.source}` : "";
		const metaStr = Object.keys(meta).length ? `\n${JSON.stringify(meta)}` : "";
		const icon = this.getColour(level)(pc.bold(this.getIcon(level)));
		const opening = this.showTimestamp || this.showSource ? `[${ts}${source}] ` : "";
		return `${opening}${icon} - ${msg.toString()}${metaStr}`;
	}

	private getIcon(level: LogLevel) {
		switch (level) {
			case LogLevel.DEBUG:
				return "⚙"; // "⚡"
			case LogLevel.INFO:
				return "ℹ";
			case LogLevel.WARN:
				return "⚠";
			case LogLevel.ERROR:
				return "⨯";
			case LogLevel.FATAL:
				return "☠";
			case LogLevel.SUCCESS:
				return "✓";
			case LogLevel.TRACE:
				return "»";
			default:
				return "";
		}
	}

	private getColour(level: LogLevel) {
		switch (level) {
			case LogLevel.DEBUG:
				return pc.magenta;
			case LogLevel.ERROR:
				return pc.red;
			case LogLevel.FATAL:
				return (string: string) => pc.bgRed(pc.white(string));
			case LogLevel.INFO:
				return pc.blue;
			case LogLevel.WARN:
				return pc.orange;
			case LogLevel.TRACE:
				return pc.cyan;
			case LogLevel.SUCCESS:
				return pc.green;
			default:
				return pc.gray;
		}
	}
}

function formatString(date: Date, formatStr: string) {
	return formatStr
		.replace("YYYY", date.getFullYear().toString())
		.replace("MM", (date.getMonth() + 1).toString())
		.replace("DD", date.getDate().toString())
		.replace("hh", date.getHours().toString())
		.replace("mm", date.getMinutes().toString())
		.replace("ss", date.getSeconds().toString());
}