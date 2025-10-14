'use client';
import { createContext, useState, useEffect, ReactNode, useCallback } from "react";
import { IUser, Role } from '../types/property';

interface AuthContextType {
  user: IUser | null;
  token: string | null;
  login: (token: string, userData: IUser) => void;
  logout: () => void;
  isAdmin: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper function to decode JWT payload (not for verification, just for initial user ID/Role check)
const decodeToken = (token: string): { id: string, role: Role } | null => {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch (e) {
    return null;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = (newToken: string , userData: IUser) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(userData);
  };

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    // Optionally redirect to home/login
    window.location.href = '/login'; 
  }, []);


  // Initial load effect
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const decoded = decodeToken(storedToken);
      if (decoded) {
        // Mocking user data from token payload for quick context loading
        setUser({ _id: decoded.id, email: '', name: 'Guest', role: decoded.role });
        setToken(storedToken);
      } else {
        localStorage.removeItem('token');
      }
    }
    setIsLoading(false);
  }, []);

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAdmin, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;