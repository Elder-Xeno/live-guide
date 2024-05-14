import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import './NavBar.css'


export default function NavBar({ user, setUser }) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  function toggleNav() {
    setIsNavOpen(!isNavOpen);
  }

  return (
    <div className="navbar-wrapper">
      <nav>
        <input className="searchBar" type="text" placeholder="Search..." />
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
    </div>
  );
}