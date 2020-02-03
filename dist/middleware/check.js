"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const httpErrors_1 = require("../utils/httpErrors");
exports.checkMoviesParams = (req, res, next) => {
    if (!req.query.movieName) {
        throw new httpErrors_1.HTTP400Error("Missing movie name parameter");
    }
    else {
        next();
    }
};
//# sourceMappingURL=check.js.map