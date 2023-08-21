import { Request, Response, NextFunction } from "express";

interface ErrorResponse {
  message: string;
  statusCode: number;
}

export function errorConverter(err: Error, req: Request, res: Response, next: NextFunction) {
  let statusCode = 500;
  let message = "Internal Server Error";

  if (err instanceof HttpException) {
    statusCode = err.status;
    message = err.message;
  }

  const errorResponse: ErrorResponse = {
    message,
    statusCode,
  };

  res.status(statusCode).json(errorResponse);
}

export function notFound(req: Request, res: Response, next: NextFunction) {
  const err = new HttpException(404, "Not Found");
  next(err);
}

export class HttpException extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}
