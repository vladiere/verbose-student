import axios from 'axios';
import { defineStore } from 'pinia';

const useSpotifyStore = defineStore('spotify', {
  state: () => ({
    access_token    : '',
    refresh_token   : '',
    expires_in      : 0,
  }),
  getters:
  {
    getAccessToken    : state => state.access_token,
    getRefreshToken   : state => state.refresh_token,
  },
  actions:
  {
    setTokens(data: { accessToken: string; refreshToken: string; expiresIn: number })
    {
      this.access_token = data.accessToken;
      this.refresh_token = data.refreshToken;
      this.expires_in = data.expiresIn;
    },
    setRefreshedSpotifyAccessToken(access_token: string) {
      this.access_token = access_token;
    },
    async handleLogin()
    {
      const response = await axios.get('/api/spotify/login');
      if (response.status === 200) {
        return response.data;
      } else {
        console.log(response);
      }
    },
    async handleGetTokens(code: string)
    {
      try {
        const response = await axios.post('/api/spotify/get_token', { code });
        this.setTokens(response.data);
      } catch (error) {
        console.error(error);
      }
    },
    clearSpotify()
    {
      this.access_token = '';
      this.refresh_token = '';
      this.expires_in = 0;
    },
  },
  persist:
  {
    storage: sessionStorage
  }
});

export default useSpotifyStore;
