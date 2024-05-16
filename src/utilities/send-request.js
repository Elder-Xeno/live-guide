import { getToken } from "./users-service";

export default async function sendRequest(url, method = "GET", payload = null, headerOpts = {}) {
  const options = { method };

  if (payload && !(payload instanceof FormData)) {
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify(payload);
  } else if (payload && payload instanceof FormData) {
    options.body = payload;
  }

  const token = getToken();
  if (token) {
    // Need to add an Authorization header
    // Use the Logical OR Assignment operator
    options.headers ||= {};
    // Older approach
    // options.headers = options.headers || {};
    options.headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(url, options);
  // if res.ok is false then something went wrong
  if (res.ok) return res.json();
  throw new Error("Bad Request");
}
