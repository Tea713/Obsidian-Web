<template>
  <div>
    <button v-if="!isLoggedIn" @click="loginWithGithub">
      Login with GitHub
    </button>
    <div v-else>
      <p>Welcome, {{ getUserEmail }}!</p>
      <button @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useAuthStore } from "/src/stores/auth";
import createGithubApi from '/src/api/githubApi';

export default {
  data() {
    return {
      username: '',
    };
  },
  computed: {
    ...mapState(useAuthStore, ["isLoggedIn", "getToken", "getUsername", "getUserEmail"]),
  },
  methods: {
    ...mapActions(useAuthStore, ["loginWithGithub", "logout"]),
    // async fetchUser() {
    //   const api = createGithubApi('this.getToken');
    //   this.username = await api.getUser();
    // },
  },
  // mounted() {
  //   if (this.isLoggedIn) {
  //     this.fetchUser();
  //   }
  // },
  // created() {
  //   watch(() => this.isLoggedIn, (newVal) => {
  //     if (newVal) {
  //       this.fetchUser();
  //     }
  //   });
  // },
};
</script>

<style>
</style>