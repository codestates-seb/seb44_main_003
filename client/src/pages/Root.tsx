import { useEffect } from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
import TopButton from '@/components/common/button/TopButton';
import Modal from '@/components/common/modal/Modal';
import Toast from '@/components/common/toast/Toast';
import Footer from '@/components/main/Footer';
import { logout } from '@/components/main/header/Dropdown';
import Header from '@/components/main/header/Header';
import MobileGNB from '@/components/main/MobileGNB';
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
