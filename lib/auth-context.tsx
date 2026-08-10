'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role } from '@/types';
import { DEFAULT_CURRENT_USER, MOCK_USERS } from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, role?: Role) => Promise<boolean>;
  logout: () => void;
  register: (userData: Partial<User>) => Promise<boolean>;
  switchRole: (newRole: Role) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: DEFAULT_CURRENT_USER,
  isAuthenticated: true,
  login: async () => false,
  logout: () => {},
  register: async () => false,
  switchRole: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(DEFAULT_CURRENT_USER);

  useEffect(() => {
    // Load persisted user session from localStorage if available
    const savedUser = localStorage.getItem('pragathi_user_session');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Failed to parse saved user session', e);
      }
    }
  }, []);

  const login = async (email: string, role?: Role): Promise<boolean> => {
    // Find matching mock user or construct new authenticated participant
    const existing = MOCK_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() || (role && u.role === role)
    );

    const activeUser: User = existing || {
      id: `usr_${Date.now()}`,
      name: email.split('@')[0].replace('.', ' '),
      email,
      role: role || 'PARTICIPANT',
      college: 'SR University',
      department: 'Computer Science & Engineering',
      rollNo: '22SRU01CS101',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setUser(activeUser);
    localStorage.setItem('pragathi_user_session', JSON.stringify(activeUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pragathi_user_session');
  };

  const register = async (userData: Partial<User>): Promise<boolean> => {
    const newUser: User = {
      id: `usr_reg_${Date.now()}`,
      name: userData.name || 'Student Innovator',
      email: userData.email || '',
      phone: userData.phone || '',
      role: 'PARTICIPANT',
      college: userData.college || 'SR University',
      department: userData.department || 'Computer Science & Engineering',
      rollNo: userData.rollNo || '2203A51000',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setUser(newUser);
    localStorage.setItem('pragathi_user_session', JSON.stringify(newUser));
    return true;
  };

  const switchRole = (newRole: Role) => {
    const matchedRoleUser = MOCK_USERS.find((u) => u.role === newRole);
    if (matchedRoleUser) {
      setUser(matchedRoleUser);
      localStorage.setItem('pragathi_user_session', JSON.stringify(matchedRoleUser));
    } else if (user) {
      const updated = { ...user, role: newRole };
      setUser(updated);
      localStorage.setItem('pragathi_user_session', JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        register,
        switchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
