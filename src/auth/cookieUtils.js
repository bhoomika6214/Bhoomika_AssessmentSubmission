import Cookies from "js-cookie";
import { JWT_COOKIE_NAME } from "../utils/constants";

// Thin wrapper around js-cookie. Nothing else in the app should call
// Cookies.get/set/remove directly for the JWT — this is the single
// source of truth so the cookie name/options only need to change in one place.

export function setToken(token) {
  // secure: true should only be forced in production (https). In local dev over
  // http, `secure: true` will silently prevent the cookie from being set.
  const isProd = process.env.NODE_ENV === "production";
  Cookies.set(JWT_COOKIE_NAME, token, {
    expires: 1, // 1 day — align with backend token expiry if known
    secure: isProd,
    sameSite: "strict",
  });
}

export function getToken() {
  return Cookies.get(JWT_COOKIE_NAME);
}

export function removeToken() {
  Cookies.remove(JWT_COOKIE_NAME);
}
