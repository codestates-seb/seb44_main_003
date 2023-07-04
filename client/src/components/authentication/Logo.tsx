import logoImg from '../../assets/logo/logo_yellow.svg';
import { styled } from 'styled-components';

function Logo() {
  return (
    <S_Wrapper>
      <img src={logoImg} alt="yellow logo" />
    </S_Wrapper>
  );
}

export default Logo;

const S_Wrapper = styled.div`
  width: 130px;
  height: 52px;
`;
