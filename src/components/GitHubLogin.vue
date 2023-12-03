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

export default {
  computed: {
    ...mapState(useAuthStore, ["isLoggedIn", "getUserEmail", "getUser"]),
  },
  methods: {
    ...mapActions(useAuthStore, ["loginWithGithub", "logout"]),
  },
};
</script>
  
  <style>
</style>
    
