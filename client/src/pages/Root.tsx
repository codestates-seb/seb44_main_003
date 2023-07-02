import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import { StyledRoot, StyledWrapper } from '../style/style';

function Root() {
  return (
    <StyledRoot>
      <Header />
      <StyledWrapper>
        <Outlet />
      </StyledWrapper>
    </StyledRoot>
  );
}

export default Root;
