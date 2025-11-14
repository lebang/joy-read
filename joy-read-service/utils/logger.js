import winston from "winston"
import processEnv from "./process-env.js"
import MySQLTransport from "winston-mysql"
import { logConfig } from "../models/database.js"


const options = {
  host: logConfig.host,
  user: logConfig.username,
  password: logConfig.password,
  database: logConfig.database,
  table: 'Logs'
};

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.timestamp(),
    winston.format.json(),
  ),
  defaultMeta: { service: "joy-read" },
  transports: [
    // new MySQLTransport(options),            // 将日志写入数据库
  ],
});

if ( processEnv !== "production") {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.errors({ stack: true }),
      winston.format.colorize(),
      winston.format.simple()
    )
  }));
}

export default logger;