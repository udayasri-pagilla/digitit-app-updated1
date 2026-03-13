import { request } from "../api/api";

// Login API function
// Sends user email and password to the backend authentication endpoint
// and returns the server response (user data or error)
export const loginUser = async (email, password) => {
  return request("/auth/login", {
    method: "POST", // HTTP POST request for authentication
    body: { email, password } // Request body containing login credentials
  });
};

// Signup API function
// Sends user signup details (email, password, role, etc.) to the backend
// and returns the server response after account creation
export const signupUser = async (payload) => {
  return request("/auth/signup", {
    method: "POST", // HTTP POST request to create a new user
    body: payload // Payload contains signup data (email, password, role, etc.)
  });
};