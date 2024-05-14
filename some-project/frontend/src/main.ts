import './assets/output.css'
import 'vue-toast-notification/dist/theme-bootstrap.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import ToastPlugin from 'vue-toast-notification';

import App from './App.vue'
import router from './router'

import './axios';

const pinia = createPinia();
const app = createApp(App)

pinia.use(piniaPluginPersistedstate);
app.use(ToastPlugin);
app.use(pinia)
app.use(router)

app.mount('#app')
