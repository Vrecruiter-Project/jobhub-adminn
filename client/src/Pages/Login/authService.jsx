import axios from 'axios';

const API_URL = 'http://localhost:9000/api/hr';

const login = (username, password) => {
  return axios.post(`${API_URL}/login`, { username, password });
};

export default { login };
