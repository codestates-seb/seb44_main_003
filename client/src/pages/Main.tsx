import { useSearchParams } from 'react-router-dom';
import MainSliderSection from '@/components/@common/slider/MainSliderSection';
import MainBanner from '@/components/@layout/banners/MainBanner';
import { REFRSH_TOKEN_DURATION } from '@/constant/constantValue.ts';
import { areTokens } from '@/utils/areTokens';
import useIsLoggedIn from '@/utils/isLoggedIn';
import { scrollToTop } from '@/utils/scrollToTop.ts';

function Main() {
  const isLoggedIn = useIsLoggedIn();
  const [searchParams] = useSearchParams();
  const accessToken = searchParams.get('access_token');
  const refreshToken = searchParams.get('refresh_token');
  if (!isLoggedIn && accessToken) {
    areTokens(accessToken, refreshToken);
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
