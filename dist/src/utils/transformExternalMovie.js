"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformExternalMovie = (externalMovie) => {
    Object.keys(externalMovie).forEach((el) => {
        el === 'DVD' ?
            externalMovie[el.toLowerCase()] = externalMovie[el] :
            externalMovie[el.charAt(0).toLowerCase() + el.substring(1)] = externalMovie[el];
    });
    const writers = externalMovie.writer.split(',').map((el) => { return { name: String(el).trim() }; });
    const actors = externalMovie.actors.split(',').map((el) => { return { name: String(el).trim() }; });
    const countries = externalMovie.country.split(',').map((el) => { return { name: String(el).trim() }; });
    externalMovie.writer = writers;
    externalMovie.actors = actors;
    externalMovie.country = countries;
    return externalMovie;
};
//# sourceMappingURL=transformExternalMovie.js.map