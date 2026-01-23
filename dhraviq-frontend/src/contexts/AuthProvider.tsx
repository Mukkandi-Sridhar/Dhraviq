import React, { createContext, useContext } from "react";
import { useAuth } from "@/hooks/useAuth";

interface AuthContextProps {
  user: any;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
