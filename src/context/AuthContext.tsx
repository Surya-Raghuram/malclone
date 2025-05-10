import { createContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  user: string | null;
  setUser: (user: string | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const email = localStorage.getItem('user');
    if (email) {
      setUser(email);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
