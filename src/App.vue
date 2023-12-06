<script>
import { RouterLink, RouterView } from "vue-router";
import { watch } from "vue";

//stores
import { useNotesStore } from "./stores/notes";

//components
import GitHubLogin from "/src/components/GitHubLogin.vue";
import DirectoryViewer from "./components/DirectoryViewer.vue";
import SideBar from "./components/SideBar.vue";
import SelectRepo from "./components/SelectRepo.vue";

export default {
  components: {
    GitHubLogin,
    DirectoryViewer,
    SideBar,
    SelectRepo,
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
      <div class="nav-links">
        <RouterLink to="/" class="nav-link">Home</RouterLink>
        <RouterLink to="/about" class="nav-link">About</RouterLink>
        <RouterLink to="/notes" class="nav-link">Notes</RouterLink>
      </div>
      <GitHubLogin />
    </nav>
    <div class="main-content">
      <div class="side-bar">
        <SelectRepo />
        <DirectoryViewer :items="items" />
      </div>
      <div class="router-view">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* .app-container {
  display: flex;
  flex-direction: column;
  height: 100vh; 
} */

.main-content {
  display: flex;
  height: 100vh;
}

nav {
  display: flex;
  justify-content: space-between;
  flex: 0 0 auto; /* This makes sure the nav doesn't grow or shrink */
}

.side-bar {
  flex: 0 0 auto; /* This makes sure the sidebar doesn't grow or shrink */
  width: 250px; /* Adjust this to change the width of the sidebar */
}

.main-content {
  flex: 1 1 auto; /* This makes the main content take up the rest of the space */
  overflow: auto; /* This adds scrollbars if the content is too big */
}
</style>