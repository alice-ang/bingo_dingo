import { User } from 'firebase/auth';
import { useRouter } from 'next/router';
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { auth } from '@/config/firebase';
import Login from '@/pages/login';

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
  const router = useRouter();

  useEffect(() => {
    return auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        setIsLoading(false);
      }
    });
  }, [user, router]);

  // // force refresh the token every 10 minutes

  return user ? (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, isLoading }}>
      {children}
    </AuthContext.Provider>
  ) : (
    <Login />
  );
};

export const useAuth = () => useContext(AuthContext);
