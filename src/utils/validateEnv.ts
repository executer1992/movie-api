import { cleanEnv, port, str } from 'envalid';

function validateEnv() {
   cleanEnv(process.env, {
      MOVIE_API: str(),
      DB_HOST: str(),
      DB_PORT: port(),
      DB_USER: str(),
      DB_PASSWORD: str(),
      DB_DATABASE: str(),
      PORT: port()
   });
}

export default validateEnv;
