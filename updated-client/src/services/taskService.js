import { request } from "../api/api";

// export const getTasks = async (filter) => {

//   const qs =
//     filter === "all"
//       ? ""
//       : `?progress=${encodeURIComponent(filter)}`;

//   return request(`/tasks${qs}`);
// };
export const getTasks = async (filter, page = 1) => {

  const params = new URLSearchParams();

  if (filter && filter !== "all") {
    params.append("progress", filter);
  }

  params.append("page", page);

  return request(`/tasks?${params.toString()}`);
};

export const createTask = async (payload) => {

  return request("/tasks", {
    method: "POST",
    body: payload
  });

};

export const updateTask = async (id, payload) => {

  return request(`/tasks/${id}`, {
    method: "PUT",
    body: payload
  });

};

export const deleteTask = async (id) => {

  return request(`/tasks/${id}`, {
    method: "DELETE"
  });

};