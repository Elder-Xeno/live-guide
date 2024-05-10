import sendRequest from "./send-request";

const BASE_URL = '/api/posts';

export async function addPost(postData) {
    return sendRequest(BASE_URL, 'POST', postData);
}

export async function getPosts() {
    return sendRequest(BASE_URL);
}

export async function getEventPosts() {
    return sendRequest(`${BASE_URL}/events`);
}

export async function createPost(postData) {
    const newPost = await addPost(postData);
    return newPost;
}
