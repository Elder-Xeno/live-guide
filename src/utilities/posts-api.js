import sendRequest from "./send-request";

const BASE_URL = "/api/posts";

export async function addPost(postData) {
  // console.log("Foad ------------", postData)
  //  { "Content-Type": "application/x-www-form-urlencoded" }
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
