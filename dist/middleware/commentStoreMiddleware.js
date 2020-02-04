"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = __importDefault(require("../exceptions/HttpException"));
function commentStoreMiddleware(request, response, next) {
    if (!request.body.text) {
        next(new HttpException_1.default(400, 'Wrong POST data, please provide text property only'));
    }
    else {
        next();
    }
}
exports.default = commentStoreMiddleware;
//# sourceMappingURL=commentStoreMiddleware.js.map