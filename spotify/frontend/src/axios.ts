import axios from 'axios';
import { useAuthStore } from './stores/auth.store';
import useSpotifyStore from './stores/spotify.store';

// axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:3500';


const refreshToken = async () => {
  try {
    const auth = useAuthStore();
    const response = await axios.post('/api/refresh', { refreshToken: auth.refresh_token });

    return response.data;
  } catch (error) {
    throw error;
  }
}

const refreshTokenSpotify = async () => {
  try {
    const spotifyStore = useSpotifyStore();
    const response = await axios.post('/api/spotify/refresh', { refreshToken: spotifyStore.refresh_token });

    return response.data;
  } catch (error) {
    throw error;
  }
}

axios.interceptors.response.use(response => response, async (error) => {
  const auth = useAuthStore();
  const spotifyStore = useSpotifyStore();
  const preUrl = error?.config.url;
  const prevReq = error?.config;
  
  if (error?.response.status === 401 || error?.response.status === 403 && !prevReq?.sent) {
    prevReq.sent = true;

    let token: any = undefined;

    if (preUrl.split('/').indexOf('spotify') !== -1) {
      token = await refreshTokenSpotify();
      spotifyStore.setRefreshedSpotifyAccessToken(token.accessToken)
    } else {
      token = await refreshToken();
      aut.refreshedAccessToken(token.accessToken);
    }

    if (token.accessToken) {
      prevReq.headers['Authorization'] = `Bearer ${token.accessToken}`;

      return axios(prevReq);
    } else {
      return Promise.reject(error);
    }
  }
  return Promise.reject(error);
})
