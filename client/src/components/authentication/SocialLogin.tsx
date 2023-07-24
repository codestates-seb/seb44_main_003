import { styled } from 'styled-components';

function SocialLogin({ isLoginPage }: { isLoginPage: boolean }) {
  return (
    <S_Wrapper>
      <p>소셜 계정으로 {isLoginPage ? '로그인' : '회원가입'}</p>
      <div>
        <a
          href={`${import.meta.env.VITE_BASE_URL}/oauth2/authorization/google`}
        >
          <img
            src={`${
              import.meta.env.VITE_IMAGE_URL
            }/social_login/google_login.svg`}
            alt="구글 로그인"
          />
        </a>
        <a href={`${import.meta.env.VITE_BASE_URL}/oauth2/authorization/naver`}>
          <img
            src={`${
              import.meta.env.VITE_IMAGE_URL
            }/social_login/naver_login.svg`}
            alt="네이버 로그인"
          />
        </a>
        <a href={`${import.meta.env.VITE_BASE_URL}/oauth2/authorization/kakao`}>
          <img
            src={`${
              import.meta.env.VITE_IMAGE_URL
            }/social_login/kakao_login.svg`}
            alt="카카오 로그인"
          />
        </a>
      </div>
    </S_Wrapper>
  );
}

export default SocialLogin;

const S_Wrapper = styled.div`
  margin: 25px 0;
  > p {
    color: var(--color-white-80);
    margin-bottom: 10px;
  }
  > div {
    display: flex;
    justify-content: space-between;
    width: 300px;
  }
`;
