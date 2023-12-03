import { defineStore } from 'pinia'
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "/src/firebase/init.js";
import { GithubAuthProvider, signOut } from 'firebase/auth';

export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            user: null,
        }
    },
    getters: {
        getUser(state) {
            return state.user;
        },
        getUserEmail(state) {
            return state.user.email;
        },
        isLoggedIn(state) {
            return state.user !== null;
        }
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
    }
})