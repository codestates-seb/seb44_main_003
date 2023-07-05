import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/Footer';
import { S_Root, S_Wrapper, S_Container } from '../styles/style';

function Root() {
  return (
    <S_Root>
      <Header />
      <S_Wrapper>
        <S_Container>
          <Outlet />
        </S_Container>
      </S_Wrapper>
      <Footer />
    </S_Root>
  );
}

export default Root;
