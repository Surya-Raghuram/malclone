
import '../styles/Navbar.css'
import LoginModal from './LoginModal';
import axios from 'axios';
import {useState, useEffect} from 'react';

const LoginSignUp = () =>{
    const [user, setUser] = useState<string | null>(null);

  
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  


  async function handleLogin(email: string, password: string) {
  try {
    const res = await axios.post("http://localhost:8080/api/authenticate", {
      email,
      password,
    });

    if (res.data.accessToken) {
      localStorage.setItem("token", res.data.accessToken);  // Save token
      localStorage.setItem("user", email);  // Save user email
      alert("Login Successful!");
      window.location.reload(); // Refresh UI
    }
  } catch (e) {
    console.error(e);
    alert("Internal Server Error, try again later!");
  }

  setIsLoginModalOpen(false);
}

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
    
  useEffect(()=>{
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('user');
    if(user && token){
      setUser(email);
    }
  },[]);
}
    return (
  <div className="sign-in">
    {user ? (
      <div className="profile-icon"><p>Hi</p></div>
    ) : (
      <>
        <button className="login-btn" onClick={() => setIsLoginModalOpen(true)}>Login</button>
        <button className="sign-in-btn" onClick={() => setIsSignUpModalOpen(true)}>Sign Up</button>
      </>
    )}

    <LoginModal
      isOpen={isLoginModalOpen}
      onClose={() => setIsLoginModalOpen(false)}
      onLogin={handleLogin}
      title="Login"
    />
    <LoginModal
      isOpen={isSignUpModalOpen}
      onClose={() => setIsSignUpModalOpen(false)}
      onLogin={handleSignUp}
      title="SignUp"
    />
  </div>
);

}

export default LoginSignUp;


