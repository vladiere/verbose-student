import { defineStore } from 'pinia';
import axios from 'axios';
import { useSocketStore } from './socket.store';
import useSpotifyStore from './spotify.store';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user_id         : 0,
    refresh_token   : '',
    access_token    : '',
    auth            : false,
  }),
  getters:
  {
    isAuthenticated   : (state) => state.auth,
    getAccessToken    : (state) => state.access_token,
    getRefreshToken   : (state) => state.refresh_token,
  },
  actions:
  {
    setAuthenticated(data: { id: number, accessToken: string, refreshToken: string }) {
      this.auth             = true;
      this.user_id          = data.user_id;
      this.refresh_token    = data.refreshToken;
      this.access_token     = data.accessToken;
    },
    async handleLogin(data: { username: string, password: string})
    {
      const spotifyStore = useSpotifyStore();

      try {
        const response = await axios.post('/api/login', data)

        this.setAuthenticated(response.data.user);
        const spotify = await spotifyStore.handleLogin();
        return {
          msg: 'success',
          spotify: spotify.data,
          stats: 1,
        };
      } catch (error) {
        return {
          msg: error.response.data.error,
          stats: 0 
        };
      }
    },
    async handleRegister(data: { fullname: string, username: string, password: string })
    {

      try {
        await axios.post('/api/register', data)
        return {
          msg: 'success',
          stats: 1,
        };
      } catch (error) {
        return {
          msg: error.response.data.error, stats: 0 
        };
      }
    },
    async handleLogout() {
      const socketStore = useSocketStore();
      const spotifyStore = useSpotifyStore();

      await axios.post('/api/logout', { refreshToken: this.getRefreshToken });

      socketStore.removeSocketId();
      spotifyStore.clearSpotify();
      this.auth = false;
      this.user_id = 0;
      this.refresh_token = '';
      this.access_token = '';
    }
  },
  persist: {
    storae: localStorage,
  }
})
