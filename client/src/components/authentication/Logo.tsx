import { styled } from 'styled-components';

function Logo() {
  return (
    <S_Wrapper>
      <img
        src={`${import.meta.env.VITE_IMAGE_URL}/logo/logo_yellow.svg`}
        alt="메인 로고"
      />
    </S_Wrapper>
  );
}

export default Logo;

const S_Wrapper = styled.div`
  width: 130px;
  height: 52px;
`;
