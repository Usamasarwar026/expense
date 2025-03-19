import axios from 'axios';

const AxiosInsatnce = axios.create({
  baseURL: 'https://api.exchangerate-api.com/v4/latest',
});

export default AxiosInsatnce;
