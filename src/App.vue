<script lang="ts">
import { defineComponent, ref } from "vue";
import MovieSearch from "./components/MovieSearch.vue";
import MovieList from "./components/MovieList.vue";
import type { Movie, MovieDetails } from "./types";
import { fetchMovies, fetchMovieDetails } from "./api";

export default defineComponent({
  components: {
    MovieSearch,
    MovieList,
  },
  setup() {
    const movieList = ref<Movie[]>([]);
    const selectedMovie = ref<MovieDetails | null>(null);

    const searchMovies = async (query: string) => {
      try {
        movieList.value = await fetchMovies(query);
      } catch (error) {
        console.error("Error fetching movies:", error);
        movieList.value = [];
      }
    };

    const showMovieDetails = async (movieId: string) => {
      try {
        selectedMovie.value = await fetchMovieDetails(movieId);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        selectedMovie.value = null;
      }
    };

    const goBackToList = () => {
      selectedMovie.value = null;
    };

    return {
      movieList,
      selectedMovie,
      searchMovies,
      showMovieDetails,
      goBackToList,
    };
  },
});
</script>

<template>
    <!-- Header -->
    <header class="bg-blue-500 text-white py-4">
      <div class="container mx-auto text-center">
        <h1 class="text-4xl font-bold">Movie Finder</h1>
      </div>
    </header>

    <!-- Hide the search bar when viewing movie details -->
    <MovieSearch v-if="!selectedMovie" @search="searchMovies" />

    <!-- Movie list view -->
    <MovieList
      v-if="!selectedMovie"
      :movies="movieList"
      @movie-click="showMovieDetails"
    />

    <!-- Movie detail view, centered and larger -->
    <div
      v-else
      class="flex items-center justify-center min-h-screen p-4 sm:p-12 bg-gray-100"
    >
      <div class="flex flex-col sm:flex-row gap-8 sm:gap-24 p-6 sm:p-12 bg-white rounded-lg shadow-2xl w-full max-w-7xl">
        <img
          :src="selectedMovie.Poster"
          :alt="selectedMovie.Title"
          class="w-full sm:w-96 h-auto sm:h-[600px] object-cover rounded-lg shadow-lg"
        />
        <div class="flex-1 overflow-y-auto max-h-[85vh]">
          <h1 class="text-3xl sm:text-5xl font-bold mb-4 sm:mb-8">
            {{ selectedMovie.Title }} ({{ selectedMovie.Year }})
          </h1>
          <p class="text-lg sm:text-2xl mb-4 sm:mb-6">
            <strong>Genre:</strong> {{ selectedMovie.Genre }}
          </p>
          <p class="text-base sm:text-xl mb-6 sm:mb-8">
            <strong>Plot:</strong> <span class="block">{{ selectedMovie.Plot }}</span>
          </p>
          <p class="text-lg sm:text-2xl mb-4 sm:mb-6">
            <strong>IMDb Rating:</strong> {{ selectedMovie.imdbRating }}
          </p>
          <p class="text-lg sm:text-2xl mb-6 sm:mb-8">
            <strong>Actors:</strong> {{ selectedMovie.Actors }}
          </p>

          <!-- Centered Back to List Button -->
          <div class="flex justify-center mt-6 sm:mt-10">
            <button
              @click="goBackToList"
              class="px-8 sm:px-12 py-4 sm:py-5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-base sm:text-lg"
            >
              Back to List
            </button>
          </div>
        </div>
      </div>
    </div>
</template>
