import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import './NavBar.css'


export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <div class="navbar-wrapper">
    <nav>
      <input className='searchBar' type="text" placeholder="Search..." />
      &nbsp; | &nbsp;
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
      &nbsp;&nbsp;
      &nbsp;&nbsp;
      <Link to="" onClick={handleLogOut}>Log Out</Link>
    </nav>
    </div>
  );
}