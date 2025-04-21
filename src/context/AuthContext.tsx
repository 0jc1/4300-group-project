// src/context/AuthContext.tsx
"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // This runs ONCE on mount, to sync with localStorage
  useEffect(() => {
    const storedStatus = localStorage.getItem("sniffed-out-auth");
    if (storedStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const login = () => {
    localStorage.setItem("sniffed-out-auth", "true");
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("sniffed-out-auth");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
