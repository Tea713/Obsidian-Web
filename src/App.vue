<script>
import { RouterLink, RouterView } from "vue-router";
import GitHubLogin from "/src/components/GitHubLogin.vue";
export default {
  components: {
    GitHubLogin,
  },
};
</script>

<template>
  <GitHubLogin />
  <nav>
    <RouterLink to="/" class="nav-link">Home</RouterLink>
    <RouterLink to="/about" class="nav-link">About</RouterLink>
    <RouterLink to="/notes" class="nav-link">Notes</RouterLink>
  </nav>
  <RouterView />
</template>

<style>
.nav-link {
  margin-right: 1rem;
}
</style>
