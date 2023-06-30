import { styled } from 'styled-components';
import logo from '../../assets/logo/logo_white.png';

function MainLogo() {
  return (
    <S_Wrapper>
      <img src={logo} alt="main logo" />
    </S_Wrapper>
  );
}

export default MainLogo;

const S_Wrapper = styled.div`
  margin-right: 30px;
`;
