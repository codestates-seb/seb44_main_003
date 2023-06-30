import { styled } from 'styled-components';
import logo from '../../assets/logo/logo_white.png';
import { useNavigate } from 'react-router-dom';

function MainLogo() {
  const navigate = useNavigate();
  return (
    <S_Wrapper onClick={() => navigate('/')}>
      <img src={logo} alt="main logo" />
    </S_Wrapper>
  );
}

export default MainLogo;

const S_Wrapper = styled.div`
  margin-right: 30px;
  cursor: pointer;
  width: 150px;
`;
