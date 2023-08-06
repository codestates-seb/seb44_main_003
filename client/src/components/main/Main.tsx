import { useSearchParams } from 'react-router-dom';
import MainBanner from '@/components/main/MainBanner';
import MainSliderSection from '@/components/main/MainSliderSection';
import { REFRSH_TOKEN_DURATION } from '@/constant/constantValue.ts';
import useIsLoggedIn from '@/hooks/useIsLoggedIn';
import { useTokens } from '@/hooks/useTokens.ts';
import { scrollToTop } from '@/utils/scrollToTop.ts';

function Main() {
  const isLoggedIn = useIsLoggedIn();
  const [searchParams] = useSearchParams();
  const accessToken = searchParams.get('access_token');
  const refreshToken = searchParams.get('refresh_token');
  if (!isLoggedIn && accessToken) {
    useTokens(accessToken, refreshToken);
    const expiration = new Date();
    expiration.setMinutes(expiration.getMinutes() + REFRSH_TOKEN_DURATION);
    localStorage.setItem('expiration', expiration.toISOString());
    window.location.href = `${import.meta.env.VITE_CLIENT_URL}`;
  }

  scrollToTop();

  return (
    <>
      <MainBanner />
      <MainSliderSection />
    </>
  );
}

export default Main;
