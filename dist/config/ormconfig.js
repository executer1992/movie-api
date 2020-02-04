"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DBConfig {
    constructor() {
        this.production = {
            type: 'postgres',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            synchronize: true,
            url: process.env.DATABASE_URL,
            extra: {
                ssl: true
            },
            entities: ['dist/entity/**/*.js'],
            migrations: ['dist/migration/**/*.js'],
            cli: {
                migrationsDir: 'src/migration',
                entitiesDir: 'src/entity'
            }
        };
        this.development = {
            type: 'postgres',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            synchronize: true,
            entities: ['dist/entity/**/*.js'],
            migrations: ['dist/migration/**/*.js'],
            cli: {
                migrationsDir: 'src/migration',
                entitiesDir: 'src/entity'
            }
        };
        this.test = {
            type: 'postgres',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE_TEST,
            synchronize: true,
            logging: false,
            dropSchema: true,
            entities: ['dist/entity/**/*.js'],
            migrations: ['dist/migration/**/*.js'],
            cli: {
                migrationsDir: 'src/migration',
                entitiesDir: 'src/entity'
            }
        };
        this.environment = process.env.NODE_ENV || 'development';
    }
    get config() {
        return this.environment === 'test' ? this.test : this.environment === 'production' ? this.production : this.development;
    }
}
exports.default = DBConfig;
//# sourceMappingURL=ormconfig.js.map