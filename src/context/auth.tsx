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

export const useAuth = () => useContext(AuthContext);
