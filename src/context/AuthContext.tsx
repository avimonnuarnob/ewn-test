/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { auth } from '../firebase/firebase';

import { AuthContenxtValueType, SignUpUser } from '../types/AuthTypes';

const AuthContext = React.createContext<
  AuthContenxtValueType | Record<string, never>
>({});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signUp = (user: SignUpUser) => {
    setMessage('');
    setError('');
    createUserWithEmailAndPassword(auth, user.email, user.password)
      .then(() => setMessage('user created successfully'))
      .catch((e) => setError(e.message));
  };

  const logIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth);
  };

  const value: AuthContenxtValueType = {
    currentUser,
    message,
    error,

    signUp,
    logIn,
    logOut,
    setError,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('AuthContext must be used within a AuthContextProvider');
  }
  return context;
}
