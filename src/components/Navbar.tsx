import  {useState, useRef} from 'react';
import {  Bell, MessageSquare, User } from 'lucide-react';
import '../styles/Navbar.css'
import AnimeSearchButton from './AnimeSearch';
import { Link } from 'react-router-dom';


const Navbar = () =>{
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
   const timeoutRef = useRef<NodeJS.Timeout | null>(null);
                            //Number returned by browser when using setTimeout/ setIntervel. 
  const handleMouseEnter = () => {
    // Clear any existing timeout to prevent accidental closure
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsDropDownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsDropDownOpen(false);
    }, 2000); // 3 seconds
  };
  return(
    <>
    <nav className="navbar-top">
      <div className="navbar-left">
        <Link className='logo' to="/">MyAnimeList </Link>  
      </div>  
      <div className="navbar-right">
        
        <div className="nav-icons">
          <Bell size={25} className="nav-icon"/>
          <MessageSquare size={25} className="nav-icon"/>
          <User size={25} className="nav-icon"/>
        </div>
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