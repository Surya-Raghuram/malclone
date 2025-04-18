import Navbar from './components/Navbar';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopAnime from './components/TopAnime';


export default function App(){
  return(
    <div className="App">
      <TopAnime />
    </div>
  )
}