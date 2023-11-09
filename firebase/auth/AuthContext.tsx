import * as React from "react";

import { createContext, useContext, useState } from "react";

import {
  User,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { FIREBASE_AUTH } from "firebase/config";

interface AuthContextData {
  user: User | null;
  isLoading: boolean;
  isSignOut: boolean;
  login(username: string, password: string): void;
  logout(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isSignOut, setSignOut] = useState<boolean>(false);

  async function login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      setUser(userCredential.user);
      console.log(user);
      setLoading(false);
    } catch (err) {
      console.log("Got an err");
    }
    return user;
  }

  function logout() {
    signOut(FIREBASE_AUTH);
    setUser(null);
    setSignOut(true);
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, isSignOut, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth needs an AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
