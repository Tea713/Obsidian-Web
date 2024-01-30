import { defineStore } from 'pinia';
import createGithubApi from '/src/api/githubApi.js';
import { useAuthStore } from './auth';

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: {},
    repositories: [], // new state property to store the list of repositories
    currentRepository: null, // new state property to store the currently selected repository
    currentNote: null,
  }),
  getters: {
    getNotes: (state) => (path) => state.notes[path] || [],
    getRepositories: (state) => state.repositories,
    getCurrentRepository: (state) => state.currentRepository,
    getCurrentNote: (state) => state.currentNote,
  },
  actions: {
    async fetchNotes(repo, path = '') {
      try {
        const authStore = useAuthStore(); // access the auth store
        const api = createGithubApi(authStore.token); // use the token from the auth store
        if(!authStore.token) {
          console.log("No token");
        }
        if(!authStore.getUsername) {
          console.log("No username");
        }
        if(!path) {
          console.log("path");
        }

        const notes = await api.fetchNotes(authStore.getUsername, repo, path);
        this.notes[path] = notes;
      } catch (error) {
        console.error('Failed to fetch notes:', error);
        // handle the error appropriately
      }
    },
    async fetchRepositories() { // new action to fetch the list of repositories
      try {
        const authStore = useAuthStore();
        const api = createGithubApi(authStore.token);
        if(!authStore.token) {
          console.log("No token");
        }

        const repositories = await api.fetchRepositories();
        this.repositories = repositories;
        //console.log(repositories);
      } catch (error) {
        console.error('Failed to fetch repositories:', error);
        // handle the error appropriately
      }
    },
    setCurrentRepository(repo) { // new action to set the currently selected repository
      this.currentRepository = repo;
    },
    setCurrentNote(note) {
      this.currentNote = note;
    },
  },
});