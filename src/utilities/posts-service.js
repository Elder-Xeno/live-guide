import * as postsAPI from './posts-api';

export async function fetchPosts() {
  const posts = await postsAPI.getPosts();
  return posts;
}

export async function fetchEventPosts() {
  const eventPosts = await postsAPI.getEventPosts();
  return eventPosts;
}