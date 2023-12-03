<script>
import { RouterLink, RouterView } from "vue-router";
import GitHubLogin from "/src/components/GitHubLogin.vue";
import Sidebar from "/src/components/Sidebar.vue";
export default {
  components: {
    GitHubLogin,
    Sidebar
  },
};
</script>

<template>
  <GitHubLogin />
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
  </nav>
  <div class="side-bar">
    <Sidebar />
  </div>
  <RouterView />
</template>

<style scoped>
</style>
