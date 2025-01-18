import axios from 'axios';
window.axios = axios;

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.baseURL = import.meta.env.VITE_API_URL ?? '';

const auth = localStorage.getItem('auth');

if (auth) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(auth).access_token}`;
}

