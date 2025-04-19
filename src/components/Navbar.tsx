import  {useState, useRef} from 'react';
import {  Bell, MessageSquare, User } from 'lucide-react';
import '../styles/Navbar.css'
import AnimeSearchButton from './AnimeSearch';
import { Link } from 'react-router-dom';
import LoginModal from './LoginModal';
import axios from 'axios';



const Navbar = () =>{
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
   const timeoutRef = useRef<NodeJS.Timeout | null>(null);
// <NodeJS.Timeout> is Number returned by browser when using setTimeout/ setIntervel. 
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsDropDownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsDropDownOpen(false);
    }, 2000);
  };

// dude fml
const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  
  async function handleLogin (email: string, password: string)  {
    console.log('Login attempt:', email, password);
    try{
      await axios.post("http://localhost:8080/", {
        email, password
      }).then(res => {
        if(res.data == "exist"){
          alert("Login Successful!");
        }
        else if(res.data == "not_exist"){
          alert("User doesnot exist!")}
          
      }).catch(e =>{
        alert("Wrong details");
        console.log(e);
      })
    }
    catch(e) {
      console.log(e);
    }
    setIsLoginModalOpen(false);
  };

  async function handleSignUp (email: string, password: string){
    console.log('Sign up attempt:', email, password);
    try{
      await axios.post("http://localhost:8080/signup", {
        email, password
      }).then(
        (res) => {
          if(res.data == "exist"){
            alert("User already exist");
          }
          else if(res.data == "not_exist"){
          alert("Signed you up");
          console.log(`New nigga in the chat! ${email} ${password}`);
        }
      }
    );
  }  catch(e){
    console.log(e);
  }
    
    
  }




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
        <div className="sign-in" >
           <button className="login-btn" onClick={()=> setIsLoginModalOpen(true)}>Login</button>
          <button className="sign-in-btn" onClick={()=> setIsSignUpModalOpen(true)} >Sign Up</button>
         
        <LoginModal 
          isOpen = {isLoginModalOpen}
          onClose={()=> setIsLoginModalOpen(false)}
          onLogin={handleLogin} 
        />
        <LoginModal 
          isOpen = {isSignUpModalOpen}
          onClose = {()=> setIsSignUpModalOpen(false)}
          onLogin={handleSignUp}

        />

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