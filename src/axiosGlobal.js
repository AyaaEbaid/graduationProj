import axios from "axios";
import { showToast } from "./components/ToastHandler/ToastHandlar"

let isHandling401 = false;

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("userToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (res) => res,
  (error) => {
    const lang = localStorage.getItem("i18nextLng") || "en";

    if (error.response?.status === 401 && !isHandling401) {
      isHandling401 = true;

      localStorage.removeItem("userToken");

      showToast("error", "sessionExpired", lang);

      setTimeout(() => {
        window.location.href = "/login";
        isHandling401 = false;
      }, 2000);
    }

    return Promise.reject(error);
  }
);