import React, { useState, useEffect } from 'react';
import { getPosts, getEventPosts } from '../../utilities/posts-api';
import Post from '../../components/Post/Post';
import EventPost from '../../components/EventPost/EventPost';
import "./NewsFeed.css"

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
      <img src="https://i.imgur.com/wW4UdAj.png" alt="newsfeed-logo" className="newsfeed-logo" />
      <br/>
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
