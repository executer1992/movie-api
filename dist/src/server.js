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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const app_1 = __importDefault(require("./app"));
const ormconfig_1 = require("../ormconfig");
const MoviesController_1 = __importDefault(require("./services/movies/MoviesController"));
const validateEnv_1 = __importDefault(require("./utils/validateEnv"));
const CommentsController_1 = __importDefault(require("./services/comments/CommentsController"));
validateEnv_1.default();
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield typeorm_1.createConnection(ormconfig_1.config);
        yield connection.runMigrations();
    }
    catch (error) {
        console.log('Error while connecting to the database', error);
        return error;
    }
    const app = new app_1.default([
        new MoviesController_1.default(),
        new CommentsController_1.default()
    ]);
    app.listen();
}))();
//# sourceMappingURL=server.js.map