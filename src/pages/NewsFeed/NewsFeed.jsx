import { useState, useEffect } from 'react';
import { fetchPosts, fetchEventPosts } from '../../utilities/posts-service';
import Post from '../../components/Post/Post';
import EventPost from '../../components/EventPost/EventPost';

export default function NewsFeed() {
  const [posts, setPosts] = useState([]);
  const [eventPosts, setEventPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsData = await fetchPosts();
        setPosts(postsData);
        
        const eventPostsData = await fetchEventPosts();
        setEventPosts(eventPostsData);
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