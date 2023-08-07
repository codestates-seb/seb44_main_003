import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import Button from '@/components/@common/button/Button';
import { SCROLL_Y_SECTION_1 } from '@/constant/constantValue';

function LoginSignup({ position }: { position: number }) {
  const navigate = useNavigate();
  return (
    <S_Wrapper>
      <Button
        onClick={() => navigate('/login')}
        variant={position >= SCROLL_Y_SECTION_1 ? 'solid' : 'default'}
      >
        로그인
      </Button>
      <Button
        onClick={() => navigate('/signup')}
        variant={position >= SCROLL_Y_SECTION_1 ? 'solid' : 'default'}
      >
        회원가입
      </Button>
    </S_Wrapper>
  );
}

export default LoginSignup;

const S_Wrapper = styled.div`
  display: flex;
  gap: 10px;
  height: 30px;
  width: 170px;
  margin-left: 20px;
  > button {
    font-size: 15px;
    font-weight: 300;
  }
  @media only screen and (max-width: 480px) {
    width: 120px;
    height: 20px;
    > button {
      font-size: 13px;
    }
  }
`;
