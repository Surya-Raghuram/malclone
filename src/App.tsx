import Navbar from './components/Navbar';
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TopAnime from './components/TopAnime';
import Profile  from './components/Profile';

export default function App(){
  return(
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/top/anime" element={<TopAnime />}/>
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}
