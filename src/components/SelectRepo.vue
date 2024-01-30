<template>
  <div>
    <select v-model="selectedRepo" @change="selectRepo" class="repo-dropdown" :disabled="!isLoggedIn">
      <option disabled value="">Select a repository</option>
      <option v-for="repo in repositories" :key="repo.name" :value="repo.name">
        {{ repo.name }}
      </option>
    </select>
  </div>
</template>
    
<script>
import { useNotesStore } from "/src/stores/notes.js";
import { useAuthStore } from "../stores/auth";
import { mapActions, mapState } from "pinia";
import { watch } from "vue";

export default {
  data() {
    return {
      repositories: [],
      notes: [],
      selectedRepo: "",
    };
  },
  computed: {
    ...mapState(useNotesStore, [
      "getNotes",
      "getRepositories",
      "getCurrentRepository",
    ]),
    ...mapState(useAuthStore, ["getToken", "isLoggedIn"]),
  },
  methods: {
    ...mapActions(useNotesStore, [
      "fetchNotes",
      "fetchRepositories",
      "setCurrentRepository",
    ]),
    selectRepo() {
      this.setCurrentRepository(this.selectedRepo);
    },
  },
  watch: {
    // Watch the token in the authStore
    getToken: {
      handler(newToken, oldToken) {
        // If the new token exists and is different from the old token
        if (newToken && newToken !== oldToken) {
          this.fetchRepositories().then(() => {
            this.repositories = this.getRepositories;
          });
        }
      },
      immediate: true, // This will ensure the handler is called right away
    },
  },
};
</script>

<style scoped>

</style>