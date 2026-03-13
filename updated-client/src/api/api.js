// Base URL for the backend API
// It first checks if an environment variable (VITE_API_URL) exists
// If not, it falls back to the local backend server
const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:3000";


// Generic helper function to make API requests
// This function is reusable for GET, POST, PUT, DELETE etc.
async function request(path, { method = "GET", body } = {}) {

  // Send HTTP request to backend using fetch
  const res = await fetch(`${API_URL}${path}`, {
    method, // HTTP method (GET by default)
    credentials: "include", // Includes cookies for authentication/session
    headers: {
      "Content-Type": "application/json" // Indicates JSON request body
    },
    // Convert body object to JSON string if body exists
    body: body ? JSON.stringify(body) : undefined
  });

  // Try to parse response as JSON
  // If parsing fails (e.g., empty response), return null instead of crashing
  const data = await res.json().catch(() => null);

  // If request failed (status not 2xx), throw an error
  // Either return backend error response or a default message
  if (!res.ok) {
    throw data || { message: "Request failed" };
  }

  // Return successful response data
  return data;
}

// Export the request function so it can be used in other files
export { request };