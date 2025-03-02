import React, { createContext, useState, useContext, useEffect } from "react";
import { login as loginService } from "../services/auth";
import { useDispatch } from "react-redux";
import { updateCurrentUser } from "@/redux/actions/currentUserAction";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginFormValues) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem("ci-auth-user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      dispatch(updateCurrentUser(parsedUser));
    }

    setLoading(false);
  }, [dispatch]);

  const login = async (credentials: LoginFormValues): Promise<void> => {
    setLoading(true);
    try {
      const response = await loginService(credentials);
      setUser(response);
      localStorage.setItem("ci-auth-user", JSON.stringify(response));
      dispatch(updateCurrentUser(response));
    }
    catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
    finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setLoading(true);
    try {
      setUser(null);
      localStorage.removeItem("ci-auth-user");
    }
    catch (error) {
      console.error("Logout failed:", error);
    }
    finally {
      setLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export const isAlreadyAuthenticated = (): boolean => {
  return !!localStorage.getItem("ci-auth-user");
};
