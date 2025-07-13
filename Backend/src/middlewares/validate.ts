import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

export const validate =
  (Schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      Schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: Array(error),
      });
    }
  };
