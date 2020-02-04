"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformExternalMovie = (externalMovie) => {
    const transformedMovie = {};
    Object.keys(externalMovie).forEach((el) => {
        el === 'DVD'
            ? (transformedMovie[el.toLowerCase()] = externalMovie[el])
            : (transformedMovie[el.charAt(0).toLowerCase() + el.substring(1)] = externalMovie[el]);
    });
    const writers = externalMovie.Writer.split(',').map((el) => {
        return { name: String(el).trim() };
    });
    const actors = externalMovie.Actors.split(',').map((el) => {
        return { name: String(el).trim() };
    });
    const countries = externalMovie.Country.split(',').map((el) => {
        return { name: String(el).trim() };
    });
    const languages = externalMovie.Language.split(',').map((el) => {
        return { language: String(el).trim() };
    });
    const genres = externalMovie.Genre.split(',').map((el) => {
        return { genre: String(el).trim() };
    });
    transformedMovie.writer = writers;
    transformedMovie.actors = actors;
    transformedMovie.country = countries;
    transformedMovie.genre = genres;
    transformedMovie.language = languages;
    return transformedMovie;
};
//# sourceMappingURL=transformExternalMovie.js.map