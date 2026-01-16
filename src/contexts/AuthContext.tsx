import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { authApi, User } from 'src/lib/api/auth';
import { getToken } from 'src/lib/apiClient';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: boolean;
  refetchUser: () => Promise<void>;
  clearAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchUser = async () => {
    const token = getToken();
    
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const response = await authApi.me();
      setUser(response.employee);
      setError(false);
    } catch (err) {
      console.error('Failed to fetch user:', err);
      setUser(null);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const refetchUser = async () => {
    setIsLoading(true);
    await fetchUser();
  };

  const clearAuth = () => {
    setUser(null);
    setIsLoading(false);
    setError(false);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, error, refetchUser, clearAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
