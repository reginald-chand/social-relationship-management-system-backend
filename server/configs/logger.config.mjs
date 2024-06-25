import { createLogger, format, transports } from "winston";

/**
 * @example logger.log({
 *  level: 'info',
 *  message: 'Example message',
 *  additional: 'Properties',
 *  are: 'Passed along',
 * })
 * @see Documentation https://github.com/winstonjs/winston/blob/master/examples/quick-start.js
 */
export const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: "social-relationship-management-system-backend" },
  transports: [
    new transports.File({ filename: "log/error.log", level: "error" }),
    new transports.File({ filename: "log/warn.log", level: "warn" }),
    new transports.File({ filename: "log/info.log", level: "info" }),
    new transports.File({ filename: "log/http.log", level: "http" }),
    new transports.File({ filename: "log/debug.log", level: "debug" }),
    new transports.File({ filename: "log/combined.log", level: "info" }),
  ],
});

if (process.env.NODE_ENVIRONMENT !== "production") {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    })
  );
}
