import React, { useState, useEffect } from 'react';
import { getPosts, getEventPosts } from '../../utilities/posts-api';
import Post from '../../components/Post/Post';
import EventPost from '../../components/EventPost/EventPost';

export default function NewsFeed() {
  const [posts, setPosts] = useState([]);
  const [eventPosts, setEventPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsData = await getPosts();
        const sortedPosts = postsData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPosts(sortedPosts);

        const eventPostsData = await getEventPosts();
        const sortedEventPosts = eventPostsData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setEventPosts(sortedEventPosts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="news-feed">
      <h1>News Feed</h1>

      <h2>Regular Posts</h2>
      {posts.map(post => (
        <Post key={post._id} post={post} />
      ))}

      <h2>Event/Gig Posts</h2>
      {eventPosts.map(eventPost => (
        <EventPost key={eventPost._id} eventPost={eventPost} />
      ))}
    </div>
  );
}
