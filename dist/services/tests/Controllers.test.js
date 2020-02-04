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
const typeorm_1 = require("typeorm");
const supertest_1 = __importDefault(require("supertest"));
const MoviesController_1 = __importDefault(require("../movies/MoviesController"));
const ormconfig_1 = __importDefault(require("../../config/ormconfig"));
const app_1 = __importDefault(require("../../app"));
const CommentsController_1 = __importDefault(require("../comments/CommentsController"));
const HttpException_1 = __importDefault(require("../../exceptions/HttpException"));
const MovieNotFoundException_1 = __importDefault(require("../../exceptions/MovieNotFoundException"));
const DuplicateMovieException_1 = __importDefault(require("../../exceptions/DuplicateMovieException"));
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dbConfig = new ormconfig_1.default();
        const connection = yield typeorm_1.createConnection(dbConfig.config);
        yield connection.runMigrations();
    }
    catch (error) {
        console.log('Error while connecting to the test database', error);
        return error;
    }
}));
describe('Movie Endpoints', () => {
    it('should fetch all movies', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield supertest_1.default(new app_1.default([new MoviesController_1.default()]).getServer()).get('/api/v1/movies');
        expect(res.status).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
    }));
    it('should create a new movie', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield supertest_1.default(new app_1.default([new MoviesController_1.default()]).getServer())
            .post('/api/v1/movies')
            .send({
            title: 'Joker'
        });
        expect(res.status).toEqual(201);
        expect(res.body).toHaveProperty('actors');
    }));
    it('should throw httpException while creating new movie', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield supertest_1.default(new app_1.default([new MoviesController_1.default()]).getServer())
                .post('/api/v1/movies')
                .send({
                titlee: 'Joker'
            });
        }
        catch (error) {
            expect(error).toThrow(HttpException_1.default);
        }
    }));
    it('should throw duplicateMovieException creating new movie', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield supertest_1.default(new app_1.default([new MoviesController_1.default()]).getServer())
                .post('/api/v1/movies')
                .send({
                title: 'Joker'
            });
            yield supertest_1.default(new app_1.default([new MoviesController_1.default()]).getServer())
                .post('/api/v1/movies')
                .send({
                title: 'Joker'
            });
        }
        catch (error) {
            expect(error).toThrow(DuplicateMovieException_1.default);
        }
    }));
    it('should throw movieNotFoundException creating new movie', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield supertest_1.default(new app_1.default([new MoviesController_1.default()]).getServer())
                .post('/api/v1/movies')
                .send({
                title: 'Jokerzxcasdasd'
            });
        }
        catch (error) {
            expect(error).toThrow(MovieNotFoundException_1.default);
        }
    }));
});
describe('Comments Endpoints', () => {
    it('should fetch all comments', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield supertest_1.default(new app_1.default([new CommentsController_1.default()]).getServer()).get('/api/v1/comments');
        expect(res.status).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
    }));
    it('should create a new comment', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield supertest_1.default(new app_1.default([new CommentsController_1.default()]).getServer())
            .post('/api/v1/comments')
            .send({
            text: 'New Comment'
        });
        expect(res.status).toEqual(201);
        expect(res.body).toHaveProperty('text');
    }));
    it('should fail creating new comment', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield supertest_1.default(new app_1.default([new CommentsController_1.default()]).getServer())
                .post('/api/v1/comments')
                .send({
                txt: 'Jokers'
            });
        }
        catch (error) {
            expect(error).toThrow();
        }
    }));
});
//# sourceMappingURL=Controllers.test.js.map