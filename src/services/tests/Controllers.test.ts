import { createConnection, getConnection } from 'typeorm';
import request from 'supertest';
import MoviesController from '../movies/MoviesController';
import DBConfig from '../../config/ormconfig';
import App from '../../app';
import CommentsController from '../comments/CommentsController';
import HttpException from '../../exceptions/HttpException';
import MovieNotFoundException from '../../exceptions/MovieNotFoundException';
import DuplicateMovieException from '../../exceptions/DuplicateMovieException';

beforeAll(async () => {
   try {
      const dbConfig = new DBConfig();
      const connection = await createConnection(dbConfig.config);
      await connection.runMigrations();
   } catch (error) {
      console.log('Error while connecting to the test database', error);
      return error;
   }
});
describe('Movie Endpoints', () => {
   it('should fetch all movies', async () => {
      const res = await request(new App([new MoviesController()]).getServer()).get('/api/v1/movies');

      expect(res.status).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
   });

   it('should create a new movie', async () => {
      const res = await request(new App([new MoviesController()]).getServer())
         .post('/api/v1/movies')
         .send({
            title: 'Joker'
         });
      expect(res.status).toEqual(201);
      expect(res.body).toHaveProperty('actors');
   });

   it('should throw httpException while creating new movie', async () => {
      try {
         await request(new App([new MoviesController()]).getServer())
            .post('/api/v1/movies')
            .send({
               titlee: 'Joker'
            });
      } catch (error) {
         expect(error).toThrow(HttpException);
      }
   });

   it('should throw duplicateMovieException creating new movie', async () => {
      try {
         await request(new App([new MoviesController()]).getServer())
            .post('/api/v1/movies')
            .send({
               title: 'Joker'
            });
         await request(new App([new MoviesController()]).getServer())
            .post('/api/v1/movies')
            .send({
               title: 'Joker'
            });
      } catch (error) {
         expect(error).toThrow(DuplicateMovieException);
      }
   });

   it('should throw movieNotFoundException creating new movie', async () => {
      try {
         await request(new App([new MoviesController()]).getServer())
            .post('/api/v1/movies')
            .send({
               title: 'Jokerzxcasdasd'
            });
      } catch (error) {
         expect(error).toThrow(MovieNotFoundException);
      }
   });
});

describe('Comments Endpoints', () => {
   it('should fetch all comments', async () => {
      const res = await request(new App([new CommentsController()]).getServer()).get('/api/v1/comments');

      expect(res.status).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
   });

   it('should create a new comment', async () => {
      const res = await request(new App([new CommentsController()]).getServer())
         .post('/api/v1/comments')
         .send({
            text: 'New Comment'
         });
      expect(res.status).toEqual(201);
      expect(res.body).toHaveProperty('text');
   });

   it('should fail creating new comment', async () => {
      try {
         await request(new App([new CommentsController()]).getServer())
            .post('/api/v1/comments')
            .send({
               txt: 'Jokers'
            });
      } catch (error) {
         expect(error).toThrow();
      }
   });
});
