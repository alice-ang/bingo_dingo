import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { useAuth } from '@/context/auth';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [router, user]);

  return <div>{user ? children : null}</div>;
};
