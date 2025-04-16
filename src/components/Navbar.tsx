import '../styles/Navbar.css'
import {User, Menu, Search} from 'lucide-react';

export default function Navbar(){
    return(
        <>
            <div id="navbar">
                <div id="nav-left">
                    <span id="mal">MyAnimeList</span>
                </div>
                <div id="nav-right">
                    <User />
                    <div className="division">|</div>
                    <Menu /> 
                </div>
            </div>
            <nav id="dropdown">
                <div id="dropdown-menu">
                    <span>Anime</span>
                </div>
            </nav>   
        </>
        
    )
};
