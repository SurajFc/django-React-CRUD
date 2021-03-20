import axios from "axios";
import { Redirect } from "react-router-dom";

const API_URL = "http://localhost:8000/api/";

const API = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Add a request interceptor
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    if (token) {
      config.headers["Authorization"] = "jwt " + token;
    }
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

//Add a response interceptor
API.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      originalRequest.url === `${API_URL}token/refresh/`
    ) {
      <Redirect to="/login" />;
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refresh");
      return axios
        .post(`${API_URL}token/refresh/`, {
          refresh: refreshToken,
        })
        .then((res) => {
          if (res.status === 200) {
            console.log("in here");
            localStorage.setItem("access", res.data["access"]);
            axios.defaults.headers.common["Authorization"] =
              "jwt " + localStorage.getItem("access");
            return axios(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
);

export default API;
