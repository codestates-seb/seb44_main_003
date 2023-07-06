import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/Footer';
import { S_Root, S_Wrapper, S_Container } from '../styles/style';
import { useLocation } from 'react-router-dom';

function Root() {
  const location = useLocation();
  const pathname = location.pathname;
  const IsSpacedTop = !(pathname === '/tv' || pathname === '/movie');
  return (
    <S_Root>
      <Header />
      <S_Wrapper $spacedTop={IsSpacedTop}>
        <S_Container>
          <Outlet />
        </S_Container>
      </S_Wrapper>
      <Footer />
    </S_Root>
  );
}

export default Root;
