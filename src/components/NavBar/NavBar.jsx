import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import * as usersAPI from '../../utilities/users-api';
import './NavBar.css';

export default function NavBar({ user, setUser }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  function toggleNav() {
    setIsNavOpen(!isNavOpen);
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const users = await usersAPI.searchUsers(searchQuery);
      setSearchResults(users);
    }
  };

  return (
    <div className="navbar-wrapper">
      <nav>
        <img src="https://i.imgur.com/FpyHsKx.png" alt="Navbar Logo" className="navbar-logo" />
        <form onSubmit={handleSearch} className="search-form">
          <input
            className="searchBar"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
          />
          <button type="submit">Search</button>
        </form>
        <button className="nav-toggle" onClick={toggleNav}>
          ☰
        </button>
        <div className={`links ${isNavOpen ? 'open' : ''}`}>
          <span>Welcome, {user.name}</span>
          &nbsp; | &nbsp;
          <Link to="/profile">Profile</Link>
          &nbsp; | &nbsp;
          <Link to="/">News Feed</Link>
          &nbsp; | &nbsp;
          <Link to="/add-post">Add Post</Link>
          &nbsp; | &nbsp;
          <Link to="/add-event">Add Gig/Event</Link>
          &nbsp; | &nbsp;
          <Link to="" onClick={handleLogOut}>Log Out</Link>
        </div>
      </nav>
      <div className="search-results">
        {searchResults.map(user => (
          <div key={user._id} className="search-result">
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <button onClick={() => navigate(`/profile/${user._id}`)}>View Profile</button>
          </div>
        ))}
      </div>
    </div>
  );
}