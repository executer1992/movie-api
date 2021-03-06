import { transformExternalMovie } from './../../utils/transformExternalMovie';
import { getExternalMovieByTitle } from './providers/MoviesDataProvider';
import { Movie } from '../../entity/Movie';
import * as express from 'express';
import { getRepository } from 'typeorm';
import Controller from '../../interfaces/controller';
import DuplicateMovieException from '../../exceptions/DuplicateMovieException';
import MovieNotFoundException from '../../exceptions/MovieNotFoundException';
import MovieResponse from '../../interfaces/movieResponse';
import movieStoreMiddleware from '../../middleware/movieStoreMiddleware';

class MoviesController implements Controller {
   public path = '/movies';
   public router = express.Router();
   private movieRepository = getRepository(Movie);

   constructor() {
      this.initializeRoutes();
   }

   private initializeRoutes() {
      this.router.get(this.path, this.getMovies);
      this.router.post(this.path, movieStoreMiddleware, this.create);
   }

   private getMovies = async (request: express.Request, response: express.Response): Promise<void> => {
      const movies: Movie[] = await this.movieRepository.find({ relations: ['actors', 'writer', 'country', 'genre', 'language']});
      response.status(200).send(movies);
   };

   private create = async (
      request: express.Request,
      response: express.Response,
      next: express.NextFunction
   ): Promise<void> => {
      const title = request.body.title;
      const movie = await this.movieRepository.findOne({
         where: { title },
         relations: ['actors', 'writer', 'country', 'genre', 'language']
      });
      if (movie) {
         next(new DuplicateMovieException(title));
      } else {
         try {
            const externalMovie: MovieResponse = await getExternalMovieByTitle(title);
            const transformedMovie: Movie = transformExternalMovie(externalMovie);
            await this.movieRepository.save(transformedMovie);
            response.status(201).send(transformedMovie);
         } catch (error) {
            next(new MovieNotFoundException(title));
         }
      }
   };
}

export default MoviesController;
