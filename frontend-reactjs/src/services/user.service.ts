import axios from 'axios';
import authHeader from './auth-header';

const API_URL = process.env.REACT_APP_BASE_URL;

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }
}

export default new UserService();
