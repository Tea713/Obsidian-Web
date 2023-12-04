import { defineStore } from 'pinia';
import createGithubApi from './githubApi';
import { useAuthStore } from './auth';

export const useNotesStore = defineStore({
  id: 'notes',
  state: () => ({
    notes: [],
  }),
  actions: {
    async fetchNotes(owner, repo, path) {
      const authStore = useAuthStore(); // access the auth store
      const api = createGithubApi(authStore.token); // use the token from the auth store
      const notes = await api.fetchNotes(owner, repo, path);
      this.setNotes(notes);
    },
    setNotes(notes) {
      this.notes = notes;
    },
  },
});