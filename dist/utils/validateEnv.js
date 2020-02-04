"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const envalid_1 = require("envalid");
function validateEnv() {
    envalid_1.cleanEnv(process.env, {
        MOVIE_API: envalid_1.str(),
        DB_HOST: envalid_1.str(),
        DB_PORT: envalid_1.port(),
        DB_USER: envalid_1.str(),
        DB_PASSWORD: envalid_1.str(),
        DB_DATABASE: envalid_1.str(),
        PORT: envalid_1.port()
    });
}
exports.default = validateEnv;
//# sourceMappingURL=validateEnv.js.map