export const transformExternalMovie = (externalMovie: any) => {
    Object.keys(externalMovie).forEach( (el: string) => {
      el === 'DVD' ?
      externalMovie[el.toLowerCase()] = externalMovie[el]:
      externalMovie[el.charAt(0).toLowerCase() + el.substring(1)] = externalMovie[el];
      })
      const writers: string[] = externalMovie.writer.split(',').map( (el: string) => { return {name: String(el).trim()}});
      const actors: string[] = externalMovie.actors.split(',').map( (el: string) => { return {name: String(el).trim()}});
      const countries: string[] = externalMovie.country.split(',').map( (el: string) => { return {name: String(el).trim()}});
      externalMovie.writer = writers;
      externalMovie.actors = actors;
      externalMovie.country = countries;

      return externalMovie;
}