import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as usersAPI from '../../utilities/users-api';
import Post from '../../components/Post/Post';
import EventPost from '../../components/EventPost/EventPost';
import "./UserProfile.css"

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
    <div id="posts-section">
    <div className="user-profile">
      <h1>{user.name}'s Profile</h1>
      <a href="#gigs-section"><img src="https://i.imgur.com/oenRZsO.png" alt="jump-gigs-button" className="jump-gigs-button"/></a>
      <br></br>
      <img src="https://i.imgur.com/DNJ1XS7.png" alt="posts-logo" className="posts-logo" />
      {posts.map(post => (
        <Post key={post._id} post={post} />
      ))}
      </div>
      <div id="gigs-section">
      <a href="#posts-section"><img src="https://i.imgur.com/MdBfwBF.png" className="jump-posts-button"/></a>
      <br/>
      <img src="https://i.imgur.com/eAbazi0.png" alt="gigs-logo" className="gigs-logo" />
      {eventPosts.map(eventPost => (
        <EventPost key={eventPost._id} eventPost={eventPost} />
      ))}
    </div>
    </div>
  );
}

