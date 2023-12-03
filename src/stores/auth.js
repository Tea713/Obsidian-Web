// auth.js
import { defineStore } from 'pinia';
import { signInWithPopup, GithubAuthProvider, signOut, onAuthStateChanged  } from 'firebase/auth';
import { auth, provider } from '/src/firebase/init.js';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
    }),
    getters: {
        getUser: (state) => state.user,
        getUserEmail: (state) => (state.user ? state.user.email : null),
        isLoggedIn: (state) => state.user !== null,
    },
    actions: {
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
            signOut(auth).then(() => {
                this.user = null;
            });
        },
        async initializeAuth() {
            // Check if there is a user on page load
            onAuthStateChanged(auth, (user) => {
              this.user = user;
            });
          },
    },
});