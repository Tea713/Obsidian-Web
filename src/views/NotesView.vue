<template>
  <div>
    <select v-model="selectedRepo" @change="selectRepo">
      <option disabled value="">Please select a repository</option>
      <option v-for="repo in repositories" :key="repo.name" :value="repo.name">
        {{ repo.name }}
      </option>
    </select>

    <div v-for="note in notes" :key="note.name">
      <h2>{{ note.name }}</h2>
      <p>{{ note.content }}</p>
    </div>
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
      selectedRepo: null,
    };
  },
  computed: {
    ...mapState(useNotesStore, ["getNotes", "getRepositories", "getCurrentRepository"]),
  },
  methods: {
    ...mapActions(useNotesStore, ["fetchNotes", "fetchRepositories", "setCurrentRepository"]),
    selectRepo() {
      this.setCurrentRepository(this.selectedRepo);
    },
  },
  created() {
    this.fetchRepositories().then(() => {
      this.repositories = this.getRepositories;
    });
  },
};
</script>