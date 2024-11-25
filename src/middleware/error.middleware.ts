import { Request, Response, NextFunction, ErrorRequestHandler } from "express"
import { BaseError } from "../utils/error"

const errorMiddleware = (
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(err, next)
  const error = err as unknown as BaseError
  console.log(error.message)
  return res
    .status(error?.code ?? 400)
    .json({ status: "error", message: error?.message })
}

export default errorMiddleware
