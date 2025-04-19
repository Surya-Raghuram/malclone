import Home from "./components/home";
import Login from "./components/login";
import Signup from "./components/signup";
import { BrowserRouter as Router, Routes, Route } from "react-router";

function App() {
  return (
    <>
      <Router >
        <Routes >
          <Route path = "/" element = {<Login />} />
          <Route path = "/signup" element = {<Signup />} />
          <Route path = "/home" element = {<Home />} />
        </Routes>
      </Router> 
    </>
  );
}
export default App;