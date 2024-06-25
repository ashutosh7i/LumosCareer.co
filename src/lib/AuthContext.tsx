"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import { login, logout, getUserData } from "@/lib/appwrite";

interface AuthContextType {
  isLoggedIn: boolean;
  user: any | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      getUserData()
        .then((account) => {
          setUser(account);
          setIsLoggedIn(true);
        })
        .catch((error) => {
          setIsLoggedIn(false);
          setUser(null);
          router.push("/login");
        });
    };

    fetchUserData();
  }, [router]);

  const handleLogin = async (email: string, password: string) => {
    const account = await login(email, password);
    const userData = await getUserData(); // Fetch user data after login
    setIsLoggedIn(true);
    setUser(userData);
  };

  const handleLogout = async () => {
    await logout();
    setIsLoggedIn(false);
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, login: handleLogin, logout: handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
