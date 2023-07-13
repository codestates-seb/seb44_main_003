import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';

function LoginSignup() {
  const navigate = useNavigate();
  return (
    <S_Wrapper>
      <S_Button onClick={() => navigate('/login')}>login</S_Button>
      <S_Button onClick={() => navigate('/signup')}>signup</S_Button>
    </S_Wrapper>
  );
}

export default LoginSignup;

const S_Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 170px;
  margin-left: 20px;
  @media only screen and (max-width: 480px) {
    width: 110px;
  }
`;

const S_Button = styled.button`
  width: 75px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid var(--color-white-80);
  color: var(--color-white-80);
  font-weight: 300;
  background-color: #d9d9d933;
  backdrop-filter: blur(3px);
  transition: all 0.3s ease;
  &:hover {
    background-color: var(--color-white-60);
    border: 1px solid white;
    color: white;
  }
  @media only screen and (max-width: 480px) {
    width: 50px;
    height: 20px;
  }
`;
