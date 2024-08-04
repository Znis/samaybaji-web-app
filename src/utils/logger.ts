import winston, { format } from 'winston';

const logFormat = format.printf((info) => {
  const formattedNamespace = info.metadata.namespace || '';

  return `${info.metadata.timestamp} [${info.level}] [${formattedNamespace}]: ${info.message}`;
});

const logger = winston.createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.metadata(),
    logFormat,
  ),
  transports: [new winston.transports.Console()],
});

/**
 * Creates a new logger instance with the specified namespace.
 *
 * @param {string} namespace - The namespace for the new logger instance.
 * @return {Logger} A new logger instance with the specified namespace.
 */
const loggerWithNameSpace = function (namespace: string) {
  return logger.child({ namespace });
};

export default loggerWithNameSpace;
