import { useEffect } from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
import { logout } from '../components/header/Dropdown';
import Header from '../components/header/Header';
import Footer from '../components/ui/Footer';
import MobileGNB from '../components/ui/MobileGNB';
import Modal from '../components/ui/modal/Modal';
import Toast from '../components/ui/Toast';
import TopButton from '../components/ui/TopButton';
import useMediaQuery from '../hooks/useMediaQuery';
import { S_Root, S_Wrapper, S_Container } from '../styles/style';

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
