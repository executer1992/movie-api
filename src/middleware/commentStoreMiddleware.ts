import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';

function commentStoreMiddleware(request: Request, response: Response, next: NextFunction) {
    if (!request.body.text) {
        next(new HttpException(400, 'Wrong POST data, please provide text property only'));
    } else {
        next();
    }

}

export default commentStoreMiddleware;
