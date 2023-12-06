<template>
  <div>
    <select v-model="selectedRepo" @change="selectRepo">
      <option disabled value="">Select a repository</option>
      <option v-for="repo in repositories" :key="repo.name" :value="repo.name">
        {{ repo.name }}
      </option>
    </select>
  </div>
</template>
    
<script>
import { useNotesStore } from "/src/stores/notes.js";
import { mapActions, mapState } from "pinia";

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
  created() {
    this.fetchRepositories().then(() => {
      this.repositories = this.getRepositories;
      // console.log(this.repositories);
    });
  },
};
</script>