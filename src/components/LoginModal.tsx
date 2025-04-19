import React, { useState } from 'react';
import Modal from './Modal';
import '../styles/LoginModal.css'; 

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
    onClose();
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="login-modal">
        <h2>Log In</h2>
        <form onSubmit={handleSubmit}>
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
              Log In
            </button>
          </div>
        </form>
        <div className="login-footer">
          <p>Don't have an account? <a href="#">Sign up</a></p>
          <p><a href="#">Forgot password?</a></p>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;