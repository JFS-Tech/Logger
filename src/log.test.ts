import { getLogger, LogLevel } from "./index";

test("Log Success", () => {
	const logger = getLogger();
	logger.setShowTimestamp(false);

	logger.info("Testing Info Message on Logger");
	logger.error("Testing Error Message on Logger");
	logger.debug("Testing Debug Message on Logger");
	logger.warn("Testing Warn Message on Logger");
	logger.success("Testing Success Message on Logger");
	logger.trace("Testing Trace Message on Logger");
	logger.fatal("Testing Fatal Message on Logger");
});
