import React, { createContext, useContext, useState, useEffect } from "react";
import { UserCredential, User } from "@firebase/auth-types";
import { auth } from "../firebase";

interface Props {
  children: React.ReactNode;
}

interface contextInput {
  currentuser: User | null;
  signup: (a: string, b: string) => Promise<UserCredential>;
  login: (a: string, b: string) => Promise<UserCredential>;
}

const AuthContext = createContext<Partial<contextInput>>({});

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [currentuser, sertCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  function signup(email: string, password: string): Promise<UserCredential> {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email: string, password: string): Promise<UserCredential> {
    return auth.signInWithEmailAndPassword(email, password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      sertCurrentUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currentuser, signup, login }}>
      {!loading ? children  : null}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
