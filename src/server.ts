import 'dotenv/config';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import App from './app';
import DBConfig from './config/ormconfig';
import MoviesController from './services/movies/MoviesController';
import validateEnv from './utils/validateEnv';
import CommentsController from './services/comments/CommentsController';

validateEnv();

(async () => {
   try {
      const dbConfig = new DBConfig();
      const connection = await createConnection(dbConfig.config);
      await connection.runMigrations();
   } catch (error) {
      console.log('Error while connecting to the database', error);
      return error;
   }

   const app = new App([new MoviesController(), new CommentsController()]);
   app.listen();
})();
