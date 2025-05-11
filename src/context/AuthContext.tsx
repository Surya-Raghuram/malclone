import { createContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType{
  user: string | null;
  setUser: (user: string| null) => void;
  login: (user: string, token: string) => void;
  logout: () => void;
  
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  login: ()=>{},
  logout: ()=>{}
});


export const AuthProvider = ({ children }: { children: ReactNode })=>{
  const [user, setUser] = useState<string | null>(null);

  useEffect(()=>{
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if(savedUser && token){
      setUser(savedUser);
    }
  },[]);
  const login = (user: string, token: string)=>{
    localStorage.setItem('user', user);
    localStorage.setItem('token', token);
    setUser(user);
  };

  const logout = ()=>{
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  }

  return(
    <AuthContext.Provider value = {{user, setUser, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}