import axios from "axios";
import { clearPersist, store } from "../store";
import { resetAuthUserAction, setTokenAction } from "../store/auth";
import isEmpty from "../utils/isEmpty";
// import toast from "react-hot-toast";

// const BASE_URL = process.env.CLIENT_URL;
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000/api";
const axiosDEF = axios.create({ baseURL: BASE_URL });
const axiosJWT = axios.create({ baseURL: BASE_URL });

const logoutSession = async (expired = false) => {
  store.dispatch(resetAuthUserAction());
  clearPersist();
  if (expired) console.log("Session expired");
  // toast.error("Session has expired", {
  //   position: "bottom-right",
  //   duration: 2000,
  // });
};
const refreshUserToken = async () => {
  try {
    const token =
      "eyJhbGciOiJSUzI1NiIsImtpZCI6IjE2ZGE4NmU4MWJkNTllMGE4Y2YzNTgwNTJiYjUzYjUzYjE4MzA3NzMiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoibW9oYW1tYWRoYW5pMTEwQGdtYWlsLmNvbSIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9yYWF5ZS1zdXJ2ZXkiLCJhdWQiOiJyYWF5ZS1zdXJ2ZXkiLCJhdXRoX3RpbWUiOjE2ODE5ODc3ODAsInVzZXJfaWQiOiJzZjVvVXlPV011YTlCVmdNQ0NObGVDNU03OG8xIiwic3ViIjoic2Y1b1V5T1dNdWE5QlZnTUNDTmxlQzVNNzhvMSIsImlhdCI6MTY4MTk4Nzc4MCwiZXhwIjoxNjgxOTkxMzgwLCJlbWFpbCI6Im1vaGFtbWFkaGFuaTExMEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJtb2hhbW1hZGhhbmkxMTBAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.S6stZrgorEbeZgKj5c2z5ZLpX1M0UdRnWYH1g1drDYrjxWS13QnI0AlGAryucHpTl1uVI_WaMJke6iKk8kySVoCxhvMkPvCKmjRVlIKqctfcynZ01JKPf7738b2xynWqH3G6FaQqzv99tyvkblfQkz3MxaBiwZEEU2uTSS9ATUkmSJ2lTDufUjqNqJlHTWQKgRsVYG8S2lcadwIvGKLfgst7TGLn37_lnAVGy3sLnWJ1ArwEZeFmNkY_i00wu0CFxaRIVMhZuOWwcXxoqpnswZPyDuyfsV2nnRhKxzdI8RMjvT6e7rL7VVsTsj7eWiuae472dygDkzDnTJdg-T9AQQ";
    if (token) store.dispatch(setTokenAction(token));
  } catch (error) {
    console.error("ERROR: refreshUserToken ", error);
  }
};

export const useAxiosInterceptor = () => {
  const axiosInterceptor = () => {
    axiosJWT.interceptors.request.use(
      async (config) => {
        const token = await store.getState().auth.token;
        config.headers["Authorization"] = token;

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

          axios.defaults.headers.common["Authorization"] = token;
          originalRequest._retry = true;
          originalRequest.headers.Authorization = token;

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
