import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase'; // Make sure this points to your Firebase setup

interface User {
  uid: string;
  email: string;
  name: string;
}

interface Session {
  id: string;
  title: string;
  timestamp: Date;
  agents: string[];
}

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  gmailEnabled: boolean;
  setGmailEnabled: (enabled: boolean) => void;
  sessions: Session[];
  setSessions: (sessions: Session[]) => void;
  selectedAgents: string[];
  setSelectedAgents: (agents: string[]) => void;
  isAuthenticated: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [gmailEnabled, setGmailEnabled] = useState(false);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 🔗 Listen to Firebase login state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken();
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          name: firebaseUser.displayName || 'Anonymous',
        });
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        sidebarOpen,
        setSidebarOpen,
        gmailEnabled,
        setGmailEnabled,
        sessions,
        setSessions,
        selectedAgents,
        setSelectedAgents,
        isAuthenticated,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
