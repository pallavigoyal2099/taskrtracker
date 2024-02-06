import { validationResult } from "express-validator";
import httpStatus from "http-status";

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(httpStatus.BAD_REQUEST).send({
      msg: errors?.errors?.map((error) => error.msg)[0],
      errors: errors?.errors?.map((error) => error),
      success: false,
      code: httpStatus.BAD_REQUEST,
    });
    return;
  }
  next();
};
