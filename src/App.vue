<script>
import { RouterLink, RouterView } from "vue-router";
import GitHubLogin from "/src/components/GitHubLogin.vue";
import DirectoryViewer from "./components/DirectoryViewer.vue";
import { useNotesStore } from './stores/notes'; 
import { watch } from 'vue';

export default {
  components: {
    GitHubLogin,
    DirectoryViewer,
  },
  data() {
    return {
      items: []
    }
  },
  computed: {
    getCurrentRepository() {
      const notesStore = useNotesStore();
      return notesStore.getCurrentRepository;
    },
  },
  watch: {
    getCurrentRepository: {
      immediate: true,
      async handler(newRepo) {
        if (newRepo) {
          const notesStore = useNotesStore();
          await notesStore.fetchNotes(newRepo, '');
          this.items = notesStore.getNotes('');
        }
      }
    }
  },
};
</script>

<template>
  <nav>
    <RouterLink to="/" class="nav-link">Home</RouterLink>
    <RouterLink to="/about" class="nav-link">About</RouterLink>
    <RouterLink to="/notes" class="nav-link">Notes</RouterLink>
  </nav>
  <GitHubLogin />
  <RouterView />
  <DirectoryViewer :items="items"/>
</template>