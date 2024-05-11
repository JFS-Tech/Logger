/**
 * @see https://logger.jfstech.uk/docs/log-level
 * @since 0.0.1
 */
export enum LogLevel {
	/**
	 * @description The highest level of logging, used for critical errors.
	 * @since 0.0.1
	 */
	FATAL,
	/**
	 * @description Used for errors that are not critical.
	 * @since 0.0.1
	 */
	ERROR,
	/**
	 * @description Used for warnings.
	 * @since 0.0.1
	 */
	WARN,
	/**
	 * @description Used for general information.
	 * @since 0.0.1
	 */
	INFO,
	/**
	 * @description Used for debugging information.
	 * @since 0.0.1
	 */
	DEBUG,
}
