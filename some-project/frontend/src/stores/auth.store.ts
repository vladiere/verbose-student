import { defineStore } from 'pinia';
import axios from 'axios';
import ToastComponent from '../components/toast';

const useAuthStore = defineStore('auth', {
  state: () => ({
    auth: false,
  }),
  getters: {
    isAuthenticated: (state) => state.auth,
  },
  actions: {
    setAuthenticate() {
      this.auth = true;
    },
    removeAuthenticated() {
      this.auth = false;
    },
    async getUserDetails() {
      return await axios.get('/api/user');
    },
    async getCSRFToken() {
      await axios.get('/sanctum/csrf-cookie');
    },
    async handleLogout() {
      await axios.post('/logout');
      this.auth = false;
    },
    async handleLogin(data: { email: string; password: string; }) {
      try {
        await this.getCSRFToken();
        await axios.post('/login', data);
        this.setAuthenticate();
      } catch (error) {
        console.error(error)
        if (error.response.status === 422) {
          new ToastComponent('Wrong password or email', 'top-right').danger();
        }
      }
    },
    async handleRegister(data: { fullname: string; email: string; password: string; }) {
      try {
        await this.getCSRFToken();
        await axios.post('/register', data);
        this.setAuthenticate();
      } catch (error) {
        console.error(error)
      }
    }
  },
  persist: {
    storage: sessionStorage,
  },
})

export default useAuthStore;
