<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  emits: ["search"], // Emit a "search" event
  data() {
    return {
      query: "",
    };
  },
  methods: {
    onSearch() {
      if (this.query.length > 2) {
        this.$emit("search", this.query); // Emit the search event with the query
      }
    },
  },
});
</script>

<template>
  <div class="flex justify-center p-4">
    <input
      v-model="query"
      @input="onSearch"
      placeholder="Search movies..."
      class="w-full max-w-md p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
</template>
