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
const transformExternalMovie_1 = require("./../../utils/transformExternalMovie");
const MoviesDataProvider_1 = require("./providers/MoviesDataProvider");
const Movie_1 = require("../../entity/Movie");
const express = __importStar(require("express"));
const typeorm_1 = require("typeorm");
const DuplicateMovieException_1 = __importDefault(require("../../exceptions/DuplicateMovieException"));
const MovieNotFoundException_1 = __importDefault(require("../../exceptions/MovieNotFoundException"));
class MoviesController {
    constructor() {
        this.path = '/movies';
        this.router = express.Router();
        this.movieRepository = typeorm_1.getRepository(Movie_1.Movie);
        this.getMovies = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const movies = yield this.movieRepository.find();
            response.send(movies);
        });
        this.create = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const title = request.body.title;
            const movie = yield this.movieRepository.findOne({ where: { title }, relations: ['actors', 'writer', 'country'] });
            if (movie) {
                next(new DuplicateMovieException_1.default(title));
            }
            else {
                try {
                    const externalMovie = yield MoviesDataProvider_1.getExternalMovieByTitle(title);
                    const transformedMovie = transformExternalMovie_1.transformExternalMovie(externalMovie);
                    yield this.movieRepository.save(transformedMovie);
                    response.send(transformedMovie);
                }
                catch (error) {
                    next(new MovieNotFoundException_1.default(title));
                }
            }
        });
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(this.path, this.getMovies);
        this.router.post(this.path, this.create);
    }
}
exports.default = MoviesController;
//# sourceMappingURL=MoviesController.js.map