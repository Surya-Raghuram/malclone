import Navbar from './components/Navbar';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


export default function App(){
  return(
    <div className="App">
      <Navbar />
    </div>
  )
}