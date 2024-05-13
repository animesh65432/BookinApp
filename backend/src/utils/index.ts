import { check, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import jsonwebtoekn from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
export const Checkcreatetheuserbody = [
  check("UserName", "Username is required").isString(),
  check("Email", "Email is required ").isString(),
  check("Password", "Password with 6 or more characters required").isLength({
    min: 6,
  }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: errors.array(),
      });
    } else {
      next();
    }
  },
];

export const CheckForlogintheuser = [
  check("Email", "Email is required ").isString(),
  check("Password", "Password with 6 or more characters required").isLength({
    min: 6,
  }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: errors.array(),
      });
    } else {
      next();
    }
  },
];

export const createthetokens = (obj: object) => {
  let token = jsonwebtoekn.sign(
    obj,
    process.env.screct_key_for_jwtwebtokens as string,
    {
      expiresIn: "1d",
    }
  );
  return token;
};
