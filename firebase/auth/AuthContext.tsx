import * as React from "react";

import { createContext, useContext, useState } from "react";

import { User, signInWithEmailAndPassword } from "firebase/auth";

import { FIREBASE_AUTH } from "firebase/config";

interface AuthContextData {
  user: User | null;
  isLoading: boolean;
  login(username: string, password: string): void;
  logout(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);

  async function login(email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(
      FIREBASE_AUTH,
      email,
      password
    );
    setUser(userCredential.user);
    console.log(user);

    setLoading(false);
  }

  function logout() {
    setUser((prevState) => {
      return null;
    });
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
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
