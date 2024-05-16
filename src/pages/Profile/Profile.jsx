import React, { useState, useEffect } from 'react';
import * as postsAPI from '../../utilities/posts-api';
import Post from '../../components/Post/Post';
import EventPost from '../../components/EventPost/EventPost';
import "./Profile.css"

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
      <img src="https://i.imgur.com/bbQ3tnW.png" alt="profile-logo" className="profile-logo" />
      <br></br>
      <img src="https://i.imgur.com/DNJ1XS7.png" alt="posts-logo" className="posts-logo" />
      {posts.map(post => (
        <Post key={post._id} post={post} />
      ))}

      <img src="https://i.imgur.com/eAbazi0.png" alt="gigs-logo" className="gigs-logo" />
      {eventPosts.map(eventPost => (
        <EventPost key={eventPost._id} eventPost={eventPost} />
      ))}
    </div>
  );
}
