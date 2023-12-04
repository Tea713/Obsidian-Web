import { defineStore } from 'pinia';
import createGithubApi from '/src/api/githubApi.js';
import { useAuthStore } from './auth';

export const useNotesStore = defineStore({
  id: 'notes',
  state: () => ({
    owner: 'Tea713',
    repo: 'Notes',
    path: '',
    notes: [],
    repositories: [], // new state property to store the list of repositories
  }),
  actions: {
    async fetchNotes(owner, repo, path) {
      try {
        const authStore = useAuthStore(); // access the auth store

        //const api = createGithubApi(authStore.token); // use the token from the auth store
        const api = createGithubApi('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'); // use the token from the auth store

        const notes = await api.fetchNotes(owner, repo, path);
        this.setNotes(notes);
      } catch (error) {
        console.error('Failed to fetch notes:', error);
        // handle the error appropriately
      }
    },
    async fetchRepositories() { // new action to fetch the list of repositories
      try {
        const authStore = useAuthStore();
        //const api = createGithubApi(authStore.token);
        const api = createGithubApi('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');
        const repositories = await api.fetchRepositories();
        this.repositories = repositories;
      } catch (error) {
        console.error('Failed to fetch repositories:', error);
        // handle the error appropriately
      }
    },
  },
});