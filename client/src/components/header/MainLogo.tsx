import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';

function MainLogo() {
  const navigate = useNavigate();
  return (
    <S_Wrapper onClick={() => navigate('/')}>
      <img
        src={`${import.meta.env.VITE_IMAGE_URL}/logo/logo_white.webp`}
        alt="메인 로고"
      />
    </S_Wrapper>
  );
}

export default MainLogo;

const S_Wrapper = styled.div`
  margin-right: 30px;
  cursor: pointer;
  width: 150px;
  @media only screen and (max-width: 770px) and (min-width: 600px) {
    margin-right: 0;
  }
  @media only screen and (max-width: 480px) {
    width: 80px;
    height: 30px;
  }
`;
