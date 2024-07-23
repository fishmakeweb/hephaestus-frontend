// import axios from 'axios';

// const getToken = () => {
//   if (typeof window !== 'undefined') {
//     return localStorage.getItem('token');
//   }
//   return '';
// };

// const instance = axios.create({
//   baseURL: "https://api.hephaestus.store/api",
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${getToken()}`,
//   }
// });

// export default instance;

import axios from 'axios';

// Function to retrieve the token from localStorage
const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return '';
};

// Create an axios instance with a base URL
const instance = axios.create({
  baseURL: "https://api.hephaestus.store/api",
  headers: {
    "Content-Type": "application/json"
  }
});

// Use an interceptor to append the Authorization header before each request
instance.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default instance;
