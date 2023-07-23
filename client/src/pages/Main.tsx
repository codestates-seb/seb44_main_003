import MainBanner from '../components/banner/MainBanner.tsx';
import MainSliderSection from '../components/slide/mainslider/MainSliderSection.tsx';
import { useSearchParams, useLoaderData } from 'react-router-dom';
import { useEffect } from 'react';
import useIsLoggedIn from '../hooks/useIsLoggedIn';
import { scrollToTop } from '../utils/scrollToTop.ts';
import { useTokens } from '../hooks/useTokens.ts';

function Main() {
  const isLoggedIn = useIsLoggedIn();
  const [searchParams] = useSearchParams();
  const accessToken = searchParams.get('access_token');
  const refreshToken = searchParams.get('refresh_token');
  const currentToken = useLoaderData();
  if (!isLoggedIn && accessToken) {
    useTokens(accessToken, refreshToken);
    window.location.href = `${import.meta.env.VITE_CLIENT_URL}`;
  }

  scrollToTop();

  useEffect(() => {
    if (currentToken === 'EXPIRED') {
      localStorage.removeItem('token');
      localStorage.removeItem('expiration');
      window.location.reload();
    }
  }, [currentToken]);

  return (
    <>
      <MainBanner />
      <MainSliderSection />
    </>
  );
}

export default Main;
