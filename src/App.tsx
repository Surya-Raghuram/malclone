import Navbar from './components/Navbar';
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TopAnime from './components/TopAnime';


export default function App(){
  return(
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/top/anime" element={<TopAnime />}/>
      </Routes>
    </BrowserRouter>
  )
}