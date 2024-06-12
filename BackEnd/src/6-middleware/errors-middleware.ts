import express, { Request, Response, NextFunction } from 'express';
import { StatusCode } from '../3-models/enums';

class ErrorsMiddleware {
  public catchAll(
    err: any,
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    console.log('---------------------');
    console.log(err);
    console.log('---------------------');
    const statusCode = err.status || StatusCode.InternalServerError;
    const message = err.message;

    response.status(statusCode).send(message);
  }
}

export const errorsMiddleware = new ErrorsMiddleware();
