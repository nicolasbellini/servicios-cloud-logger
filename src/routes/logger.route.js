import express from "express";

import BadParamError from "../exceptions/badParamError";
import { existParams } from "../utils/utils";
import {logger} from "../config/winston";


export const loggerRouter = express.Router();

loggerRouter.post('/log', async (req, res, next) => {
  try{
      const validParams = ['level', 'message'];
    if(!existParams(validParams, req.body)) throw new BadParamError(validParams);
    const level = req.body.level;
    const message = req.body.message;
    logger.log(level, message)


    res.status(200).json({});
    next();
  } catch(err) { next(err) }
});
