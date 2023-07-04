import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
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
    </S_Root>
  );
}

export default Root;
