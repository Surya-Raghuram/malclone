import  {useState, useRef} from 'react';
import {  Bell, MessageSquare, User } from 'lucide-react';
import '../styles/Navbar.css'
import AnimeSearchButton from './AnimeSearch';
import { Link } from 'react-router-dom';
import LoginSignUp from './LoginSignup';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';


const Navbar = () =>{
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [profileDropdown, setIsProfileDropdown] = useState(false);


  const { user, logout } = useContext(AuthContext); //Auth context, used to update state across many pages.... 

// <NodeJS.Timeout> is Number returned by browser when using setTimeout/ setIntervel. 
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsDropDownOpen(true);
  };

  const ProfilehandleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsProfileDropdown(false);
    }, 2000);
  };
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsDropDownOpen(false);
    }, 2000);
  };
  


  return(
    <>
    <nav className="navbar-top">
      <div className="navbar-left">
        <Link className='logo' to="/">MyAnimeList </Link>  
      </div>  
      <div className="navbar-right">
      <div className="nav-icons">
        <Bell size={25} className="nav-icon" />
        <MessageSquare size={25} className="nav-icon" />
          {user ? (
              <div className="dropdown" >
                  <button className="dropdown-btn" id="dropdown-btn-profile" onClick={() => setIsProfileDropdown(!profileDropdown)} onMouseLeave={ProfilehandleMouseLeave}>{user}</button>
                  {profileDropdown && (
                    <div className="dropdown-content" id="profile">
                      <a id="profile-dropdown-content">
                        <button id="logout-btn" onClick={logout}>Logout</button>
                      </a>
                    </div>
                  )}
              </div>) : (
            <User size={25} className="nav-icon" />
            )}
      </div>
        {!user && <LoginSignUp />}
      </div>
    </nav>
    <nav className="navbar-bottom">
      <div className="nav-links">
          <div className="dropdown" onMouseEnter={handleMouseEnter}
          onMouseLeave= {handleMouseLeave}>
            <button className="dropdown-btn">Anime</button>
            {isDropDownOpen && (
              <div className="dropdown-content">
                <Link to="/top/anime">Top Anime</Link>
                <a href="#">Seasonal</a>
                <a href="#">Movies</a>
              </div>
            )}
            </div>
              <a href="#" className="nav-link">Manga</a>
              <a href="#" className="nav-link">Community</a>
              <a href="#" className="nav-link">Industry</a>
              <a href="#" className="nav-link">Watch</a>
              <a href="#" className="nav-link">Read</a>
              <a href="#" className="nav-link">Help</a>
        </div>
        <AnimeSearchButton />
      </nav>
    </>
  );
};

export default Navbar;