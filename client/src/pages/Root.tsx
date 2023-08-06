import { useEffect } from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
import TopButton from '@/components/button/TopButton';
import Footer from '@/components/footer/Footer';
import { logout } from '@/components/header/Dropdown';
import Header from '@/components/header/Header';
import MobileGNB from '@/components/mobile/MobileGNB';
import Modal from '@/components/modal/Modal';
import Toast from '@/components/toast/Toast';
import useMediaQuery from '@/hooks/useMediaQuery';
import { S_Root, S_Wrapper, S_Container } from '@/styles/style';

function Root() {
  const isMobile = useMediaQuery('(max-width:600px)');
  const currentToken = useLoaderData();
  useEffect(() => {
    if (currentToken === 'EXPIRED') {
      logout();
    }
  }, [currentToken]);
  return (
    <S_Root>
      <Header />
      <S_Wrapper>
        <S_Container>
          <Outlet />
          <Modal />
          <Toast />
          <TopButton />
        </S_Container>
      </S_Wrapper>
      <Footer />
      {isMobile && <MobileGNB />}
    </S_Root>
  );
}

export default Root;
