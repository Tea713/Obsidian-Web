import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useAuthStore } from '/src/stores/auth';

import App from './App.vue'
import router from './router'

//Syntax Highlighting Style
import 'highlight.js/styles/github-dark-dimmed.css';

const app = createApp(App)

app.use(createPinia())
app.use(router)
const authStore = useAuthStore();
authStore.initializeAuth();

app.mount('#app')
