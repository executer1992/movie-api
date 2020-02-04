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
   transformedMovie.writer = writers;
   transformedMovie.actors = actors;
   transformedMovie.country = countries;

   return externalMovie;
};
