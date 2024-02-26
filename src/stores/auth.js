import { defineStore } from 'pinia';
import { signInWithPopup, GithubAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, provider } from '/src/firebase/init.js';
import createGithubApi from '/src/api/githubApi.js';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: null,
        username: null,
    }),
    getters: {
        getUser: (state) => state.user,
        getToken: (state) => state.token,
        getUsername: (state) => state.username,
        getUserEmail: (state) => (state.user ? state.user.email : null),
        isLoggedIn: (state) => state.user !== null,
    },
    actions: {
        loginWithGithub() {
            signInWithPopup(auth, provider)
                .then(async (result) => {
                    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
                    const credential = GithubAuthProvider.credentialFromResult(result);

                    // The signed-in user info.
                    this.token = credential.accessToken;
                    localStorage.setItem('githubToken', this.token); // Store the token in localStorage

                    // Get the username
                    const api = createGithubApi(this.token);
                    this.username = await api.fetchUsername();
                    localStorage.setItem('username', this.username); // Store the username in localStorage

                    // The signed-in user info.
                    this.user = result.user;

                    // IdP data available using getAdditionalUserInfo(result)
                    // ...
                })
                .catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // The email of the user's account used.
                    // const email = error.customData.email;
                    // The AuthCredential type that was used.
                    // const credential = GithubAuthProvider.credentialFromError(error);
                    // ...
                });
        },
        logout() {
            signOut(auth).then(() => {
                console.log('User signed out');
                this.user = null;
                this.token = null;
                localStorage.removeItem('githubToken'); // Clear the token from localStorage
            });
        },
        async initializeAuth() {
            // Check if there is a user on page load
            onAuthStateChanged(auth, (user) => {
                this.user = user;
                if (user) {
                    this.token = localStorage.getItem('githubToken'); // Retrieve the token from localStorage
                    this.username = localStorage.getItem('username');// Retrieve the username from localStorage
                }
            });
        },
    },
});