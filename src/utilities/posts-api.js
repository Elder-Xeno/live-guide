import sendRequest from "./send-request";

const BASE_URL = "/api/posts";

export async function addPost(postData) {
  return sendRequest(BASE_URL, "POST", postData);
}

export async function addEvent(gigData) {
  return sendRequest(`${BASE_URL}/events`, "POST", gigData);
}

export async function getPosts() {
  return sendRequest(BASE_URL);
}

export async function getPostsForUser(userId) {
  return sendRequest(`${BASE_URL}/user/${userId}`);
}

export async function getEventPosts() {
  return sendRequest(`${BASE_URL}/events`);
}

export async function getEventPostsForUser(userId) {
  return sendRequest(`${BASE_URL}/events/${userId}`);
}

export async function createPost(postData) {
  return addPost(postData);
}

export async function createEvent(eventData) {
  console.log("New Event Data:", eventData);
  return addEvent(eventData);
}

export async function deletePost(postId) {
  return sendRequest(`${BASE_URL}/${postId}`, "DELETE");
}

export async function updatePost(postId, postData) {
  return sendRequest(`${BASE_URL}/${postId}`, "PUT", postData);
}

export async function likePost(postId) {
  return sendRequest(`${BASE_URL}/${postId}/like`, "POST");
}

export async function unlikePost(postId) {
  return sendRequest(`${BASE_URL}/${postId}/unlike`, "POST");
}