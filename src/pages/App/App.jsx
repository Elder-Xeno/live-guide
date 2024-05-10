import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NewsFeed from '../NewsFeed/NewsFeed';
import AddPostForm from '../../components/AddPostForm/AddPostForm';
import NavBar from '../../components/NavBar/NavBar';

export default function App() {
  const [user, setUser] = useState(getUser());

  const handleAddPost = (newPost, userData) => {
    console.log('New post:', newPost);
    console.log('User data:', userData);
  };

  return (
    <main className="App">
      { user ?
          <>
            <NavBar user={user} setUser={setUser} />
            <Routes>
              {/* Route components in here */}
              <Route path="/posts" element={<NewsFeed />} />
              {/* pass the handleAddPost function to the AddPostForm component */}
              <Route path="/add-post" element={<AddPostForm onAddPost={handleAddPost} />} />
            </Routes>
          </>
          :
          <AuthPage setUser={setUser} />
      }
    </main>
  );
}
