import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';

function movieStoreMiddleware(request: Request, response: Response, next: NextFunction) {
    if (!request.body.title) {
        next(new HttpException(400, 'Wrong POST data, please provide title property only'));
    } else {
        next();
    }

}

export default movieStoreMiddleware;
