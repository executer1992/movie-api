import { Genre } from './../entity/Genre';
import {Movie} from "../entity/Movie";

export const transformExternalMovie = (externalMovie: any): Movie => {
   const transformedMovie: any = {};
   Object.keys(externalMovie).forEach((el: string) => {
      el === 'DVD'
         ? (transformedMovie[el.toLowerCase()] = externalMovie[el])
         : (transformedMovie[el.charAt(0).toLowerCase() + el.substring(1)] = externalMovie[el]);
   });
   const writers: string[] = externalMovie.Writer.split(',').map((el: string) => {
      return { name: String(el).trim() };
   });
   const actors: string[] = externalMovie.Actors.split(',').map((el: string) => {
      return { name: String(el).trim() };
   });
   const countries: string[] = externalMovie.Country.split(',').map((el: string) => {
      return { name: String(el).trim() };
   });
   const languages: string[] = externalMovie.Language.split(',').map((el: string) => {
      return { language: String(el).trim() };
   });
   const genres: string[] = externalMovie.Genre.split(',').map((el: string) => {
      return { genre: String(el).trim() };
   });
   transformedMovie.writer = writers;
   transformedMovie.actors = actors;
   transformedMovie.country = countries;
   transformedMovie.genre = genres;
   transformedMovie.language = languages;

   return transformedMovie;
};
