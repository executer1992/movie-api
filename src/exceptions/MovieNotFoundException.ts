import HttpException from './HttpException';

class MovieNotFoundException extends HttpException {
   constructor(title: string) {
      super(404, `Movie with this title ${title} does not exists`);
   }
}

export default MovieNotFoundException;
