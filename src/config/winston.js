import {Loggly} from "winston-loggly-bulk";
import config from "./config";
import appRoot from "app-root-path"
import winston from "winston";

//const appRoot = require('app-root-path');
//const winston = require("winston");
const options = {
    file: {
        filename: `${appRoot}/logs/app.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    }
};

export const logger = winston.createLogger({
    transports: [
        new winston.transports.File(options.file),
        new Loggly({
            token: config.TOKEN,
            subdomain: config.SUBDOMAIN,
            tags: ["Winston-NodeJS"],
            json: true
        })
    ],
    exitOnError: false, // do not exit on handled exceptions
});
