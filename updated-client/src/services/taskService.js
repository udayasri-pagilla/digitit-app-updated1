import { request } from "../api/api";

// Fetch tasks from backend with optional filter and pagination
export const getTasks = async (filter, page = 1) => {

  // Create query parameters for API request
  const params = new URLSearchParams();

  // If a specific filter is selected (not "all"),
  // add progress filter to query parameters
  if (filter && filter !== "all") {
    params.append("progress", filter);
  }

  // Add page number for pagination
  params.append("page", page);

  // Send GET request to /tasks endpoint with query parameters
  return request(`/tasks?${params.toString()}`);
};

// Create a new task
export const createTask = async (payload) => {

  // Send POST request to backend with task data
  return request("/tasks", {
    method: "POST",
    body: payload
  });

};

// Update an existing task
export const updateTask = async (id, payload) => {

  // Send PUT request with task ID and updated fields
  return request(`/tasks/${id}`, {
    method: "PUT",
    body: payload
  });

};

// Delete a task
export const deleteTask = async (id) => {

  // Send DELETE request to remove the task
  return request(`/tasks/${id}`, {
    method: "DELETE"
  });

};