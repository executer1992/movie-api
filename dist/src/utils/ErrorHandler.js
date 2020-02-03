"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const httpErrors_1 = require("./httpErrors");
const httpErrors_2 = require("../utils/httpErrors");
exports.notFoundError = () => {
    throw new httpErrors_2.HTTP404Error("Method not found.");
};
exports.duplicateInstanceError = () => {
    throw new httpErrors_1.HTTP400Error('Instance already exist.');
};
exports.clientError = (err, res, next) => {
    if (err instanceof httpErrors_2.HTTPClientError) {
        console.warn(err);
        res.status(err.statusCode).send(err.message);
    }
    else {
        next(err);
    }
};
exports.serverError = (err, res, next) => {
    console.error(err);
    if (process.env.NODE_ENV === "production") {
        res.status(500).send("Internal Server Error");
    }
    else {
        res.status(500).send(err.stack);
    }
};
//# sourceMappingURL=ErrorHandler.js.map