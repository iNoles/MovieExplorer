import axios from "axios";
import type { Movie, ApiResponse, MovieDetails } from "./types";

const apiKey = "8f8d37d2";
const apiUrl = "https://www.omdbapi.com/";

export async function fetchMovies(query: string): Promise<Movie[]> {
  try {
    const response = await axios.get<ApiResponse>(
      `${apiUrl}?s=${query}&apikey=${apiKey}`
    );
    return response.data.Response === "True" ? response.data.Search : [];
  } catch (error) {
    console.error(`Error fetching movies: ${error}`);
    return [];
  }
}

export async function fetchMovieDetails(id: string): Promise<MovieDetails> {
  const response = await axios.get<MovieDetails>(
    `${apiUrl}?i=${id}&apikey=${apiKey}`
  );
  return response.data;
}
