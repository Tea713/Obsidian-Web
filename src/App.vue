<script>
import { RouterLink, RouterView } from "vue-router";
import { watch } from "vue";

//stores
import { useNotesStore } from "./stores/notes";

//components
import GitHubLogin from "/src/components/GitHubLogin.vue";
import DirectoryViewer from "./components/DirectoryViewer.vue";
import SelectRepo from "./components/SelectRepo.vue";
import SearchBar from "./components/SearchBar.vue";

export default {
  components: {
    GitHubLogin,
    DirectoryViewer,
    SelectRepo,
    SearchBar,
  },
  data() {
    return {
      items: [],
    };
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
          await notesStore.fetchNotes(newRepo, "");
          this.items = notesStore.getNotes("");
        }
      },
    },
  },
};
</script>

<template>
  <div class="app-container">
    <nav>
      <div class="nav-header">
        <h2 class="app-title">OWV</h2>
        <div class="nav-links">
          <RouterLink to="/" class="nav-link" active-class="active-link">Home</RouterLink>
          <RouterLink to="/changelog" class="nav-link" active-class="active-link">Changelog</RouterLink>
          <RouterLink to="/notes" class="nav-link" active-class="active-link">Viewer</RouterLink>
        </div>
        <SelectRepo />
      </div>
      <GitHubLogin />
    </nav>
    <div class="main-content">
      <div class="side-bar">
        <SearchBar />
        <div class="directory-view">
          <DirectoryViewer :items="items" />
        </div>
      </div>
      <div class="router-view">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>