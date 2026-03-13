import { request } from "../api/api";

export const loginUser = async (email, password) => {
  return request("/auth/login", {
    method: "POST",
    body: { email, password }
  });
};

export const signupUser = async (payload) => {
  return request("/auth/signup", {
    method: "POST",
    body: payload
  });
};