import  {useState} from 'react';
import {  Bell, MessageSquare, User } from 'lucide-react';
import '../styles/Navbar.css'
import AnimeSearchButton from './AnimeSearch';

const Navbar = () =>{
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  return(
    <>
    <nav className="navbar-top">
      <div className="navbar-left">
        <div className='logo'>MyAnimeList </div>  
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
          <div className="dropdown" onMouseEnter={()=> setIsDropDownOpen(true)}
          onMouseLeave={()=>setIsDropDownOpen(false)}>
            <button className="dropdown-btn">Anime</button>
            {isDropDownOpen && (
              <div className="dropdown-content">
                <a href="#" >Top Anime</a>
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