import Carousel from '../components/carousel/Carousel';
import { useSearchParams, useLoaderData } from 'react-router-dom';
import { useEffect } from 'react';
import useIsLoggedIn from '../hooks/useIsLoggedIn';

const Main = () => {
  const isLoggedIn = useIsLoggedIn();
  const [searchParams] = useSearchParams();
  const accessToken = searchParams.get('access_token');
  const refreshToken = searchParams.get('refresh_token');
  const currentToken = useLoaderData();
  if (!isLoggedIn && accessToken) {
    localStorage.setItem('token', `Bearer ${accessToken}`);
    const expiration = new Date();
    expiration.setMinutes(expiration.getMinutes() + 30);
    localStorage.setItem('expiration', expiration.toISOString());
    if (refreshToken)
      document.cookie = `refreshToken=${refreshToken}; path=/; HttpOnly; Secure; SameSite=None`;
    window.location.href = `${import.meta.env.VITE_CLIENT_URL}`;
  }

  useEffect(() => {
    if (currentToken === 'EXPIRED') {
      localStorage.removeItem('token');
      localStorage.removeItem('expiration');
      window.location.reload();
    }
  }, [currentToken]);

  return (
    <>
      <Carousel />
    </>
  );
};

export default Main;
