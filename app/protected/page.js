'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const ProtectedPage = () => {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token === 'authenticated') {
      setAuthenticated(true);
    } else {
      router.push('/login');
    }
  }, [router]);

  if (!authenticated) {
    return <p>Loading...</p>;
  }

  return <div>This is a protected page.</div>;
};

export default ProtectedPage;

