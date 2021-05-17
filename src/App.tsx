import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import Loading from './components/loading';
import AuthPage from './pages/auth-page';
import ChatPage from './pages/chat';

export default function App() {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [accessTokenLoaded, setAccessTokenLoaded] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;

    async function getAccessToken() {
      const token = await getAccessTokenSilently();
      window.localStorage.setItem('token', token);
      setAccessTokenLoaded(true);
    }

    getAccessToken();

    return () => {
      window.localStorage.removeItem('token');
    };
  }, [isAuthenticated, getAccessTokenSilently]);

  if (isLoading) return <Loading />;
  if (!isAuthenticated) return <AuthPage />;
  if (!accessTokenLoaded) return <Loading />;

  return <ChatPage />;
}
