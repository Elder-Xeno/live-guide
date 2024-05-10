import { useState, useEffect } from 'react';
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
        setPosts(postsData);

        const eventPostsData = await getEventPosts();
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
