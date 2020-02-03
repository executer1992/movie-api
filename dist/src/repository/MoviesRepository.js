"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Movie_1 = require("./../entity/Movie");
const typeorm_1 = require("typeorm");
let MoviesRepository = class MoviesRepository extends typeorm_1.Repository {
    constructor() {
        super();
        this.connection = typeorm_1.getConnection();
    }
    allMovies() {
        return __awaiter(this, void 0, void 0, function* () {
            let movies = yield this.find({ relations: ["actors", "writer", "country"] });
            return movies;
        });
    }
    createAndSave(movie) {
        return __awaiter(this, void 0, void 0, function* () {
            const writers = movie.writer.split(',').map((el) => { return { name: String(el).trim() }; });
            const actors = movie.actors.split(',').map((el) => { return { name: String(el).trim() }; });
            const countries = movie.country.split(',').map((el) => { return { name: String(el).trim() }; });
            movie.writer = writers;
            movie.actors = actors;
            movie.country = countries;
            return yield this.connection.createQueryBuilder()
                .insert()
                .into(Movie_1.Movie)
                .values(movie)
                .onConflict(`("id") DO NOTHING`)
                .execute();
        });
    }
};
MoviesRepository = __decorate([
    typeorm_1.EntityRepository(Movie_1.Movie),
    __metadata("design:paramtypes", [])
], MoviesRepository);
exports.MoviesRepository = MoviesRepository;
//# sourceMappingURL=MoviesRepository.js.map