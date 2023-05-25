import axios from "axios";
import { clearPersist, store } from "../store";
import { resetAuthUserAction, setTokenAction } from "../store/auth";
import isEmpty from "../utils/isEmpty";
import { toast } from "react-hot-toast";
// import toast from "react-hot-toast";

// const BASE_URL = process.env.CLIENT_URL;
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000/api";
const axiosDEF = axios.create({ baseURL: BASE_URL });
const axiosJWT = axios.create({ baseURL: BASE_URL });

const logoutSession = async (expired = false) => {
  store.dispatch(resetAuthUserAction());
  clearPersist();
  if (expired) {
    toast.error("Session has expired", {
      position: "bottom-right",
      duration: 5000,
    });
  }
};
const refreshUserToken = async () => {
  try {
    // const token =
    //   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NjkyZmUwMTZjYzRjZWIyNDE4NDM0ZiIsImlhdCI6MTY4NDcyOTg2MywiZXhwIjoxNjg3MzIxODYzfQ.J9SN6VZmV2iL2IOhiw8cqwfxB4dm8hD7h1aYQB1exyE";
    const refreshToken = store.getState().auth.refreshToken;
    console.error("refreshUserToken ", refreshToken);
    const response = await axiosJWT.post("/refresh-token", { refreshToken });
    console.log("response.data", response);

    if (response?.data?.accessToken)
      store.dispatch(setTokenAction(response?.data?.accessToken));
  } catch (error) {
    console.error("ERROR: refreshUserToken ", error);
  }
};

export const useAxiosInterceptor = () => {
  const axiosInterceptor = () => {
    axiosJWT.interceptors.request.use(
      async (config) => {
        const token = await store.getState().auth.token;
        // const token ="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NjkyZmUwMTZjYzRjZWIyNDE4NDM0ZiIsImlhdCI6MTY4NDcyOTg2MywiZXhwIjoxNjg3MzIxODYzfQ.J9SN6VZmV2iL2IOhiw8cqwfxB4dm8hD7h1aYQB1exyE";
        config.headers["Authorization"] = `Bearer ${token}`;

        // config.headers['Access-Control-Allow-Origin'] = '*';
        // config.withCredentials = false;

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    axiosJWT.interceptors.response.use(
      (response) => response,
      async (error) => {
        const retryCount = window.localStorage.getItem("retry");

        // return Promise.reject((error.response && error.response?.data) || 'Something went wrong');
        const originalRequest = error.config;
        if (error?.response?.status === 403 && retryCount === "1") {
          console.log("Session has been expired");

          window.localStorage.setItem("retry", "0");
          await logoutSession(true);

          return Promise.reject(error);
        }

        //  && !originalRequest._retry
        if (error?.response?.status === 403 && retryCount === "0") {
          console.log("Token has expired 403");

          const user = await refreshUserToken();
          if (isEmpty(user)) return;

          const token = await store.getState().auth.token;
          console.log("refreshJWTtoken: " + token);

          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          originalRequest._retry = true;
          originalRequest.headers.Authorization = `Bearer ${token}`;

          window.localStorage.setItem("retry", "1");

          // UPDATE USER TOKEN
          return axios(originalRequest);
        }

        return Promise.reject(error);
      }
    );
  };

  return axiosInterceptor;
};

export { axiosJWT, axiosDEF };
