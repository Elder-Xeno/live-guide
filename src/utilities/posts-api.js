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

export async function createPost(postData, userName) {
    const newPost = { ...postData, userName };
    return addPost(newPost);
}

export async function createEvent(eventData, userName) {
    const newEvent = { ...eventData, userName };
    return addEvent(newEvent);
}