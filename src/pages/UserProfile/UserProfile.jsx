import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as usersAPI from '../../utilities/users-api';
import Post from '../../components/Post/Post';
import EventPost from '../../components/EventPost/EventPost';

export default function UserProfile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [eventPosts, setEventPosts] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { user, posts, events } = await usersAPI.getUserProfile(userId);
        setUser(user);
        setPosts(posts);
        setEventPosts(events);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="user-profile">
      <h1>{user.name}'s Profile</h1>
      <p>Email: {user.email}</p>
      <p>Location: {user.location}</p>

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

