<template>
    <div>
      <select v-model="selectedRepo" @change="fetchNotes">
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
  import { useNotesStore } from '/src/stores/notes.js';
  
  export default {
    data() {
      return {
        selectedRepo: '',
        repositories: [],
        notes: [],
      };
    },
    created() {
      const notesStore = useNotesStore();
      notesStore.fetchRepositories().then(() => {
        this.repositories = notesStore.repositories;
      });
    },
    methods: {
      fetchNotes() {
        const notesStore = useNotesStore();
        notesStore.fetchNotes('Tea713', 'Notes', '').then(() => {
          this.notes = notesStore.notes;
        });
      },
    },
  };
  </script>