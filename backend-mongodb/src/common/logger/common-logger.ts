import { Logger } from '@nestjs/common';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { ILog } from './log.interface';

const logFormat: winston.Logform.Format = winston.format.printf(
  (info) => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`,
);

export class CommonLogger extends Logger {
  private winstonLogger: winston.Logger;

  constructor(context?: string) {
    super(context);
    const winstonTransports = new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), logFormat),
    });
    this.winstonLogger = winston.createLogger({
      transports: winstonTransports,
    });
  }

  customError(message: string, trace: string, log: ILog) {
    this.winstonLogger.error(message, log);
    super.error(message, trace);
  }
}
