import React, { useState, useEffect } from 'react';
import * as postsAPI from '../../utilities/posts-api';
import Post from '../../components/Post/Post';
import EventPost from '../../components/EventPost/EventPost';

export default function Profile({ user }) {
  const [posts, setPosts] = useState([]);
  const [eventPosts, setEventPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userPosts = await postsAPI.getPostsForUser(user._id);
        const sortedUserPosts = userPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPosts(sortedUserPosts);

        const userEventPosts = await postsAPI.getEventPostsForUser(user._id);
        const sortedUserEventPosts = userEventPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setEventPosts(sortedUserEventPosts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className="profile">
      <h1>Profile</h1>

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
