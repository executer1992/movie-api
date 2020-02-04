import HttpException from './HttpException';

class DuplicateMovieException extends HttpException {
   constructor(title: string) {
      super(400, `Movie with this title ${title} already exists`);
   }
}

export default DuplicateMovieException;
