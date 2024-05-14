import axios from 'axios';
import useAuthStore from './stores/auth.store';

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.baseURL = 'http://localhost:8000';


axios.interceptors.response.use(response => response, async (error) => {
  const prevReq = error?.config;
  const auth = useAuthStore();

  if (error?.response.status === 401 && !prevReq?.sent) {
    prevReq.sent = true;
    await auth.getCSRFToken();

    return axios(prevReq);
  }

  return Promise.reject(error);
}, error => {
  return Promis.reject(error);
})
