import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User } from 'firebase/auth';
import {
  loginWithEmail,
  loginWithGoogle,
  logoutAdmin,
  requestPasswordReset,
  changeAdminPassword,
  checkIsAdmin,
  subscribeToAuthState,
} from '../services/authService.ts';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  loginGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserPassword: (newPass: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = subscribeToAuthState(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const adminStatus = await checkIsAdmin(currentUser);
        setIsAdmin(adminStatus);
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass: string) => {
    setLoading(true);
    try {
      const loggedUser = await loginWithEmail(email, pass);
      const adminStatus = await checkIsAdmin(loggedUser);
      setIsAdmin(adminStatus);
    } finally {
      setLoading(false);
    }
  };

  const loginGoogle = async () => {
    setLoading(true);
    try {
      const loggedUser = await loginWithGoogle();
      const adminStatus = await checkIsAdmin(loggedUser);
      setIsAdmin(adminStatus);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await logoutAdmin();
      setUser(null);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    await requestPasswordReset(email);
  };

  const updateUserPassword = async (newPass: string) => {
    if (!user) throw new Error('No user is currently authenticated.');
    await changeAdminPassword(user, newPass);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        loading,
        login,
        loginGoogle,
        logout,
        resetPassword,
        updateUserPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
