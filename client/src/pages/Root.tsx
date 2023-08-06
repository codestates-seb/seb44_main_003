import { useEffect } from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
import Toast from '@/components/@common/toast/Toast';
import TopButton from '@/components/@common/topbutton/TopButton';
import Footer from '@/components/@layout/footer/Footer';
import { logout } from '@/components/@layout/header/Dropdown';
import Header from '@/components/@layout/header/Header';
import MobileGNB from '@/components/@layout/mobileGNB/MobileGNB';
import Modal from '@/components/recommend/Modal';
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
