import axios from 'axios';

const BaseApi = axios.create({
  baseURL: 'https://d11c-14-248-82-245.ngrok-free.app/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default BaseApi;
