<script lang="ts">
import { defineComponent } from "vue";
import type { Movie } from "../types";

export default defineComponent({
  props: {
    movies: {
      type: Array as () => Movie[],
      required: true,
    },
  },
  emits: ["movie-click"], // Emit event when a movie is clicked
});
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5">
    <div
      v-for="movie in movies"
      :key="movie.imdbID"
      class="flex items-center gap-4 p-4 border rounded-lg bg-white shadow-md cursor-pointer transition-transform transform hover:translate-y-1 hover:shadow-lg"
      @click="$emit('movie-click', movie.imdbID)"
    >
      <img :src="movie.Poster" :alt="movie.Title" class="w-20 h-30 object-cover rounded-md" />
      <div class="flex-1">
        <h2 class="text-xl font-bold text-gray-800">{{ movie.Title }}</h2>
        <p class="text-sm text-gray-600 mt-1">{{ movie.Year }}</p>
      </div>
    </div>
  </div>
</template>
