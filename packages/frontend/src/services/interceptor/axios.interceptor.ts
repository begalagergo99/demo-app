import axios from "axios";
import { routing } from "../../routing";

const axiosInstance = axios.create({
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("AuthToken");
  if (!token) window.location.href = routing.login;
  console.log(token);
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});


axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Redirect to login page
      //window.location.href = routing.login;
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
