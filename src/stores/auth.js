import { defineStore } from 'pinia';
import { signInWithPopup, GithubAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, provider } from '/src/firebase/init.js';
import { Octokit } from "@octokit/core";

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
                    
                    this.token = credential.accessToken;

                    // The signed-in user info.
                    this.user = result.user;
                    console.log('Logged in user:', this.user);

                    // Fetch the username from the GitHub API.
                    const octokit = new Octokit({ auth: this.getToken });
                    const { data: user } = await octokit.rest.users.getAuthenticated();
                    console.log('GitHub user:', user);

                    this.username = user.login;
                    console.log('About to log this.username');
                    console.log(this.username);

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