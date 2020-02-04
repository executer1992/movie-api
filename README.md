# movie-api

#npm install
#npm run dev

Requirments needed I will use dummy ones so you can copy to .env file:
MOVIE_API='http://www.omdbapi.com'
NODE_ENV=development
MOVIE_API_KEY='594a1b93'
DB_HOST=;localhost'
DB_PORT=5432
DB_USER='postgres'
DB_PASSWORD=''
DB_DATABASE='movie-api'
DB_DATABASE_TEST='movie-test'
PORT=4000

Application is using postgres and needs two databases for testing and development
In order to connect we need to establish postgres connection

I setup docker but had problem with running it localy on windows so could no test it.
