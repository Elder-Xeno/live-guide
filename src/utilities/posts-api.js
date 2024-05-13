import sendRequest from "./send-request";

const BASE_URL = '/api/posts';

export async function addPost(postData) {
    return sendRequest(BASE_URL, 'POST', postData);
}

export async function addEvent(gigData) {
    return sendRequest(`${BASE_URL}/events`, 'POST', gigData);
}

export async function getPosts() {
    return sendRequest(BASE_URL);
}

export async function getEventPosts() {
    return sendRequest(`${BASE_URL}/events`);
}

export async function createPost(postData) {
    return addPost(postData);
}

export async function createEvent(eventData) {
    console.log("New Event Data:", eventData);
    return addEvent(eventData);
}