import express from "express";

import BadParamError from "../exceptions/badParamError";
import { existParams } from "../utils/utils";
import { Loggly } from "winston-loggly-bulk";
import winston from "winston";
import config from "../config/config";

export const loggerRouter = express.Router();

loggerRouter.post('/log', async (req, res, next) => {
  try{
      const validParams = ['level', 'message'];
    if(!existParams(validParams, req.body)) throw new BadParamError(validParams);
    const level = req.body.level;
    const message = req.body.message;

    winston.add(new Loggly({
      token: config.TOKEN,
      subdomain: config.SUBDOMAIN,
      tags: ["Winston-NodeJS"],
      json: true
    }));
    winston.log(level, message);

    res.status(200).json({});
    next();
  } catch(err) { next(err) }
});
