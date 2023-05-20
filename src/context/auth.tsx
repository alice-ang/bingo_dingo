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

  return (
    user && (
      <AuthContext.Provider
        value={{ isAuthenticated: !!user, user, isLoading }}
      >
        {children}
      </AuthContext.Provider>
    )
  );
};

type Props = {
  children: ReactNode;
};

export const Protected = ({ children }: Props) => {
  const router = useRouter();

  const { isAuthenticated, isLoading } = useAuth();
  if (!isLoading && !isAuthenticated) {
    router.replace('/login');
  }

  if (
    isLoading ||
    (!isAuthenticated && window.location.pathname !== '/login')
  ) {
    return <h1>Loading...</h1>;
  }

  return children;
};

export const useAuth = () => useContext(AuthContext);
