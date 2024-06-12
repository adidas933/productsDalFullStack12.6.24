import express, { Request, Response, NextFunction } from 'express';
import { StatusCode } from '../3-models/enums';

class SecurityMiddleware {
  public preventXssAttack(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    for (const prop in request.body) {
      const value = request.body[prop];
      if (typeof value === 'string' && value.includes('<script>')) {
        response.status(StatusCode.BadRequest).send('Nice try!');
        return;
      }
    }
    next(); // Continue the request to the next middleware
  }
}

export const securityMiddleware = new SecurityMiddleware();
