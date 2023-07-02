import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import { S_Root, S_Wrapper, S_Container } from '../style/style';
import useMediaQuery from '../hooks/useMediaQuery';

function Root() {
  const isMobile = useMediaQuery('(max-width: 480px)');
  return (
    <S_Root $isMobile={isMobile}>
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
