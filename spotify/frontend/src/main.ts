import './assets/output.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import ToastPlugin from 'vue-toast-notification';

import App from './App.vue'
import router from './router'
import './axios';
import 'vue-toast-notification/dist/theme-bootstrap.css';

const app = createApp(App)
const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);
app.use(ToastPlugin);
app.use(pinia)
app.use(router)

app.mount('#app')
