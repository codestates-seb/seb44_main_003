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
`;

const S_Button = styled.button`
  width: 75px;
  height: 30px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.7);
  font-size: 16px;
  font-weight: 700;
`;
