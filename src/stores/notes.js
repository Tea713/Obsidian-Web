import { defineStore } from 'pinia';
import createGithubApi from '/src/api/githubApi.js';
import { useAuthStore } from './auth';
const TEST_TOKEN = "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"

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
    async fetchNotes(repo, path='') {
      try {
        const authStore = useAuthStore(); // access the auth store

        //const api = createGithubApi(authStore.token); // use the token from the auth store
        const api = createGithubApi(TEST_TOKEN); 

        const notes = await api.fetchNotes('Tea713', repo, path);
        this.notes[path] = notes;
        //console.log(notes);
      } catch (error) {
        console.error('Failed to fetch notes:', error);
        // handle the error appropriately
      }
    },
    async fetchRepositories() { // new action to fetch the list of repositories
      try {
        const authStore = useAuthStore();
        //const api = createGithubApi(authStore.token);
        const api = createGithubApi(TEST_TOKEN);
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
      console.log(note.content);
    },
  },
});