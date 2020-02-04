import { ConnectionOptions } from 'typeorm';

export const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DBPORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  entities: [
      'dist/entity/**/*.js',
  ],
  migrations: [
     'dist/migration/**/*.js',
  ],
  cli: {
    migrationsDir: 'src/migration',
    entitiesDir: "src/entity",
  },
};