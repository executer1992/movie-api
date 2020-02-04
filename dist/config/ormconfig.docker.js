"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = {
    type: 'postgres',
    host: 'db',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'movie',
    synchronize: true,
    entities: ['dist/entity/**/*.js'],
    migrations: ['dist/migration/**/*.js'],
    cli: {
        migrationsDir: 'src/migration',
        entitiesDir: 'src/entity'
    }
};
//# sourceMappingURL=ormconfig.docker.js.map