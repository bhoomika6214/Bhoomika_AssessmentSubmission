import axios from "axios";
import { API_BASE_URL } from "../utils/constants";
import { getToken } from "../auth/cookieUtils";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

// Request interceptor: attach JWT to every outgoing request automatically.
// This means individual API call functions (authApi, referralsApi) never
// need to know or care about auth headers.
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// NOTE: deliberately NOT auto-redirecting on 401 here. Per spec, an
// expired/missing token on the referrals call should be treated like any
// other failed fetch — surfaced as an in-place error message on the
// Dashboard (message + status code), not a forced navigation to /login.
// A silent global redirect would also fight with the Dashboard's own
// error-state rendering, so the interceptor stays passthrough and each
// caller decides how to react to the error.

export default axiosInstance;
