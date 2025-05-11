import React, { useState } from 'react';
import Modal from './Modal';
import '../styles/LoginModal.css'; 

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (username: string,email: string, password: string) => void;
  title: string;
  
}

const SignUpModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin, title }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, email, password);
    onClose();
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="login-modal">
        <h2>{title}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label >Username</label>
            <input
              type="text"
              id="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="login-btn">
              {title}
            </button>
          </div>
        </form>
        {title=="login"? 
        <div className="login-footer">
          <p>Don't have an account? <a href="#">Sign up</a></p>
          <p><a href="#">Forgot password?</a></p>
        </div> :
        <div className="login-footer">
          <p>Already have an account? <a href="/login">Login</a></p>
          <p><a href="#">Forgot password?</a></p>
        </div>}
        
      </div>
    </Modal>
  );
};

export default SignUpModal;