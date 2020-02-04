"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Comment_1 = require("./../../entity/Comment");
const express = __importStar(require("express"));
const typeorm_1 = require("typeorm");
const commentStoreMiddleware_1 = __importDefault(require("../../middleware/commentStoreMiddleware"));
class CommentsController {
    constructor() {
        this.path = '/comments';
        this.router = express.Router();
        this.commentRepository = typeorm_1.getRepository(Comment_1.Comment);
        this.getComments = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const comments = yield this.commentRepository.find();
            response.status(200).send(comments);
        });
        this.create = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const text = request.body.text;
            const newComment = new Comment_1.Comment();
            newComment.text = text;
            yield this.commentRepository.save(newComment);
            response.status(201).send(newComment);
        });
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(this.path, this.getComments);
        this.router.post(this.path, commentStoreMiddleware_1.default, this.create);
    }
}
exports.default = CommentsController;
//# sourceMappingURL=CommentsController.js.map