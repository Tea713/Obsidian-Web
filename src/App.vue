<script>
import { RouterLink, RouterView } from 'vue-router'
import GitHubLogin from '/src/components/GitHubLogin.vue'
export default {
  components: {
    GitHubLogin
  }
}
</script>

<template>
  <GitHubLogin />
  <nav>
      <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
  </nav>
  <RouterView />
</template>

<style scoped>
</style>
