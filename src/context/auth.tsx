import { User } from 'firebase/auth';
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { auth } from '@/config/firebase';

export const AuthContext = createContext({
  user: {} as User | null,
  isLoading: false,
  isAuthenticated: false,
});

type AuthProvider = {
  children: ReactNode;
};
export const AuthProvider: FC<AuthProvider> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    return auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        setIsLoading(false);
      }
    });
  }, [user]);

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ProtectedRoute = ({ children }: any) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (
    isLoading ||
    (!isAuthenticated && window.location.pathname !== '/login')
  ) {
    return <h1>Loading...</h1>;
  }
  return children;
};
export const useAuth = () => useContext(AuthContext);
