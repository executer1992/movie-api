import request from 'request-promise';
import dotenv from 'dotenv';

dotenv.config();

export const getExternalMovieByTitle = async (title: string) => {
   const key = process.env.MOVIE_API_KEY;
   const movieApi = process.env.MOVIE_API;
   const url = `${movieApi}/?apikey=${key}&t=${title}`;
   const response = await request(url);
   return JSON.parse(response);
};
