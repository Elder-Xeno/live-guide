import sendRequest from "./send-request";
const BASE_URL = '/api/posts';

export async function getPosts() {
  return sendRequest(BASE_URL);
}

export async function getEventPosts() {
  return sendRequest(`${BASE_URL}/events`);
}