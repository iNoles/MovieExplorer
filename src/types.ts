export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

export interface MovieDetails extends Movie {
  Genre: string;
  Plot: string;
  Actors: string;
  imdbRating: string;
}

export interface ApiResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
}
