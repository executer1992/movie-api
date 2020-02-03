"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = __importDefault(require("./HttpException"));
class DuplicateMovieException extends HttpException_1.default {
    constructor(title) {
        super(400, `Movie with this title ${title} already exists`);
    }
}
exports.default = DuplicateMovieException;
//# sourceMappingURL=DuplicateMovieException.js.map