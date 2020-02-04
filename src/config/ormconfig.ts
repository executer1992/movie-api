import { ConnectionOptions } from 'typeorm';

export const config: ConnectionOptions = {
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