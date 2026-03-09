
const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:3000";

async function request(
  path,
  { method = "GET", body } = {}
) {

  const res = await fetch(`${API_URL}${path}`, {
    method,
    credentials: "include",   // ⭐ send cookies automatically
    headers: {
      "Content-Type": "application/json"
    },
    body: body ? JSON.stringify(body) : undefined
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw data || { message: "Request failed" };
  }

  return data;
}

export { request };