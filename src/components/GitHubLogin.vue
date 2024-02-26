<template>
  <div class="login-container">
    <button v-if="!isLoggedIn" @click="loginWithGithub" class="login-btn">
      Login with GitHub
    </button>
    <div
      v-else
      class="user-info"
      @click="toggleDropdown"
      :class="{ 'dropdown-open': dropdownOpen }"
    >
      <img :src="getUser.photoURL" alt="User avatar" class="user-avatar" />
      <p class="username">{{ getUsername }}</p>
      <div class="dropdown-menu" v-show="dropdownOpen">
        <button class="profile-options">Settings</button>
        <button @click="logout" class="profile-options">Logout</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useAuthStore } from "/src/stores/auth";

export default {
  data() {
    return {
      dropdownOpen: false,
    };
  },
  computed: {
    ...mapState(useAuthStore, ["isLoggedIn", "getUsername", "getUser"]),
  },
  methods: {
    ...mapActions(useAuthStore, ["loginWithGithub", "logout"]),
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
  },
};
</script>

<style scoped>
</style>