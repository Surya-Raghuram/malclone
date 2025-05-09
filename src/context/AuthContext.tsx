import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface User {
  email: string;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  posts: any[];
  handleLogin: (email: string, password: string) => Promise<void>;
  handleLogout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  accessToken: null,
  posts: [],
  handleLogin: async () => {},
  handleLogout: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('accessToken'));
  const [posts, setPosts] = useState<any[]>([]);
  const navigate = useNavigate();

  // Axios instance for API calls
  const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: { 'Content-Type': 'application/json' },
  });

  // Add token to requests
  api.interceptors.request.use((config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  // Load user data on mount if token exists
  useEffect(() => {
    const loadUserData = async () => {
      if (accessToken && !user) {
        try {
          const profileResponse = await api.get('/profile');
          setUser({ email: profileResponse.data.message.split(' ')[1] || 'Unknown' });
          const postsResponse = await api.get('/post');
          setPosts(postsResponse.data);
        } catch (error) {
          console.error('Failed to load user data:', error);
          handleLogout();
        }
      }
    };
    loadUserData();
  }, [accessToken]);

  const handleLogin = async (email: string, password: string) => {
    try {
      const { data } = await api.post('/api/authenticate', { email, password });
      setAccessToken(data.accessToken);
      localStorage.setItem('accessToken', data.accessToken);
      setUser({ email });

      // Fetch user posts
      const postsResponse = await api.get('/post');
      setPosts(postsResponse.data);

      navigate('/profile');
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const handleLogout = async () => {
    try {
      await api.post('/logout');
      setUser(null);
      setAccessToken(null);
      setPosts([]);
      localStorage.removeItem('accessToken');
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, posts, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};