import axiosInstance from "./axiosInstance";

/**
 * Confirmed contract (Section 3 of spec):
 * Success: { data: { token } }
 * Failure (401): { message: "Invalid email or password" }
 * We just return the raw response body — AuthContext.login() is
 * responsible for pulling `data.token` out of it.
 */
export async function signIn({ email, password }) {
  const response = await axiosInstance.post("/auth/signin", { email, password });
  return response.data;
}
