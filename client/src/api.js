// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// async function request(path, { method='GET', body, token } = {}) {
//   const headers = { 'Content-Type': 'application/json' };
//   if (token) headers['Authorization'] = `Bearer ${token}`;
//   const res = await fetch(`${API_URL}${path}`, {
//     method,
//     headers,
//     body: body ? JSON.stringify(body) : undefined
//   });
//   const data = await res.json();
//   if (!res.ok) throw data;
//   return data;
// }

// export { request };
// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// async function request(path, { method='GET', body, token } = {}) {

//   const headers = {
//     'Content-Type': 'application/json'
//   };

//   // attach JWT token if available
//   if (token) {
//     headers['Authorization'] = `Bearer ${token}`;
//   }

//   const res = await fetch(`${API_URL}${path}`, {
//     method,
//     headers,
//     body: body ? JSON.stringify(body) : undefined
//   });

//   // parse JSON response
//   const data = await res.json().catch(() => null);

//   // throw error if request failed
//   if (!res.ok) throw data;

//   return data;
// }

// export { request };
const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:3000";

async function request(
  path,
  { method = "GET", body, token } = {}
) {

  const headers = {
    "Content-Type": "application/json"
  };

  // attach JWT token
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw data || { message: "Request failed" };
  }

  return data;
}

export { request };