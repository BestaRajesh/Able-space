import React, { createContext, useContext, useState } from 'react';
import { User } from '../types';
import { INITIAL_USERS } from '../data/initialData';

interface UserContextType {
  currentUser: User;
  isGuest: boolean;
  loginAsGuest: (user?: User) => void;
  switchUser: (userId: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('app_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return INITIAL_USERS[3]; // Default to Guest Reviewer for instant evaluation
  });

  const [isGuest, setIsGuest] = useState<boolean>(true);

  const loginAsGuest = (selectedUser?: User) => {
    const userToSet = selectedUser || INITIAL_USERS[3];
    setCurrentUser(userToSet);
    setIsGuest(true);
    localStorage.setItem('app_user', JSON.stringify(userToSet));
  };

  const switchUser = (userId: string) => {
    const found = INITIAL_USERS.find((u) => u.id === userId);
    if (found) {
      setCurrentUser(found);
      setIsGuest(found.id === 'usr_guest');
      localStorage.setItem('app_user', JSON.stringify(found));
    }
  };

  const logout = () => {
    // Revert to standard guest
    const guestUser = INITIAL_USERS[3];
    setCurrentUser(guestUser);
    setIsGuest(true);
    localStorage.setItem('app_user', JSON.stringify(guestUser));
  };

  return (
    <UserContext.Provider value={{ currentUser, isGuest, loginAsGuest, switchUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
