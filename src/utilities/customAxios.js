import axios from 'axios';

const customAxios = axios.create({
  baseURL: 'https://doctorbookingbackendapp.erickpjoshy.cloud',
  timeout: 4000,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export default customAxios;
