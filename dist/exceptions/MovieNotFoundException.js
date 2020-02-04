"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = __importDefault(require("./HttpException"));
class MovieNotFoundException extends HttpException_1.default {
    constructor(title) {
        super(404, `Movie with this title ${title} does not exists`);
    }
}
exports.default = MovieNotFoundException;
//# sourceMappingURL=MovieNotFoundException.js.map