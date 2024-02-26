// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
import { getAuth, GithubAuthProvider } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWi8q2qxI8e3Ss1VWMQrCA-4fqm7mfdX8",
  authDomain: "obsidian-web-viewer.firebaseapp.com",
  projectId: "obsidian-web-viewer",
  storageBucket: "obsidian-web-viewer.appspot.com",
  messagingSenderId: "58884208947",
  appId: "1:58884208947:web:a858f1578d0b2cdb222646",
  measurementId: "G-84FJSNL2ME"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore()
const auth = getAuth(app);
const provider = new GithubAuthProvider();
provider.addScope('repo');
provider.addScope('read:user');
export { db, auth, provider }