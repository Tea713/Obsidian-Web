<template>
    <button v-if="!user" @click="loginWithGithub">Login with GitHub</button>
    <div v-else>
      <p>Welcome, {{ user.email }}!</p>
      <button @click="logout">Logout</button>
    </div>
  </template>
  
  <script>
  import { signInWithPopup } from "firebase/auth";
  import { auth, provider } from "/src/firebase/init.js";
  export default {
    data() {
      return {
        user: null,
      };
    },
    methods: {
      loginWithGithub() {
        signInWithPopup(auth, provider)
          .then((result) => {
            // This gives you a GitHub Access Token. You can use it to access the GitHub API.
            const credential = GithubAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
  
            // The signed-in user info.
            this.user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
  
            //get github username
            this.fetchGitHubUsername(token);
          })
          .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            //    const email = error.customData.email;
            // The AuthCredential type that was used.
            //    const credential = GithubAuthProvider.credentialFromError(error);
            // ...
          });
      },
      logout() {
        auth.signOut();
        this.user = null;
      },
    },
    created() {
      // Check if the user is already logged in
      auth.onAuthStateChanged((user) => {
        if (user) {
          this.user = user;   
        } else {
          //user is signed out
        }
      });
    },
  };
  </script>
  
  <style>
  </style>