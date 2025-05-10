import '../styles/Navbar.css';
import LoginModal from './LoginModal';
import axios from 'axios';
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // 👈 import context

const LoginSignUp = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  const { user, setUser } = useContext(AuthContext); // 👈 use context

  async function handleLogin(email: string, password: string) {
    try {
      const res = await axios.post('http://localhost:8080/api/authenticate', {
        email,
        password,
      });

      if (res.data.accessToken) {
        localStorage.setItem('token', res.data.accessToken);
        localStorage.setItem('user', email);
        setUser(email); // 👈 update context
        alert('Login Successful!');
      }
    } catch (e) {
      console.error(e);
      alert('Internal Server Error, try again later!');
    }

    setIsLoginModalOpen(false);
  }

  async function handleSignUp(email: string, password: string) {
    console.log('Sign up attempt:', email, password);
    try {
      const res = await axios.post('http://localhost:8080/signup', {
        email,
        password,
      });

      if (res.data === 'exist') {
        alert('User already exists');
      } else if (res.data === 'not_exist') {
        alert('Signed you up');
        console.log(`New user: ${email}`);
      }
    } catch (e) {
      console.log(e);
    }

    setIsSignUpModalOpen(false);
  }

  return (
    <div className="sign-in">
      {user ? (
        <div className="profile-icon">
          <p>Hi, {user}</p>
        </div>
      ) : (
        <>
          <button className="login-btn" onClick={() => setIsLoginModalOpen(true)}>
            Login
          </button>
          <button className="sign-in-btn" onClick={() => setIsSignUpModalOpen(true)}>
            Sign Up
          </button>
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
};

export default LoginSignUp;
