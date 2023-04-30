import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

export const errorHandler = (
  error: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isValidationError = error instanceof ValidationError;
  res.status(isValidationError ? 400 : 500).json({
    message: isValidationError
      ? error.message
      : "Try again later. Some error occured.",
  });
};

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}
