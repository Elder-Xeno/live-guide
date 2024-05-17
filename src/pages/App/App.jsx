import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NewsFeed from '../NewsFeed/NewsFeed';
import Profile from '../Profile/Profile';
import NavBar from '../../components/NavBar/NavBar';
import AddPostForm from '../../components/AddPostForm/AddPostForm';
import AddEventForm from '../../components/AddEventForm/AddEventForm';
import UserProfile from '../UserProfile/UserProfile';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getUser();
      setUser(currentUser);
    };

    fetchUser();
  }, []);

  const handleAddPost = (newPost, userData) => {
    console.log('New post:', newPost);
    console.log('User data:', userData);
  };
  
  const handleAddEvent = (gigData) => {
    console.log('New gig:', gigData);
  };
  
  return (
    <main className="App">
      { user ?
          <>
            <NavBar user={user} setUser={setUser} />
            <Routes>
              <Route path="/" element={<NewsFeed />} />
              <Route path="/profile" element={<Profile user={user} />} />
              <Route path="/profile/:userId" element={<UserProfile />} />
              <Route path="/add-post" element={<AddPostForm onAdd={handleAddPost} user={user} />} />
              <Route path="/add-event" element={<AddEventForm onAdd={handleAddEvent} user={user} />} />
            </Routes>
          </>
          :
          <AuthPage setUser={setUser} />
      }
    </main>
  );
}

