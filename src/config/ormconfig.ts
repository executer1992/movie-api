import { ConnectionOptions } from 'typeorm';

class DBConfig {
  private environment: string;
  constructor() {    
    this.environment = process.env.NODE_ENV || 'development';
  }
  
  get config(): ConnectionOptions {
    return this.environment === 'test' ? this.test : this.environment === 'production' ? this.production : this.development;
  }

  private production: ConnectionOptions = {
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

  private development: ConnectionOptions = {
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

  private test: ConnectionOptions = {
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
}

export default DBConfig;