import { styled } from 'styled-components';
import google from '../../assets/social_login/google_login.svg';
import naver from '../../assets/social_login/naver_login.svg';
import kakao from '../../assets/social_login/kakao_login.svg';

function SocialLogin({ isLoginPage }: { isLoginPage: boolean }) {
  return (
    <S_Wrapper>
      <p>소셜 계정으로 {isLoginPage ? '로그인' : '회원가입'}</p>
      <div>
        <a
          href={`${import.meta.env.VITE_BASE_URL}/oauth2/authorization/google`}
        >
          <img src={google} alt="google login" />
        </a>
        <a href={`${import.meta.env.VITE_BASE_URL}/oauth2/authorization/naver`}>
          <img src={naver} alt="naver login" />
        </a>
        <a href={`${import.meta.env.VITE_BASE_URL}/oauth2/authorization/kakao`}>
          <img src={kakao} alt="kakao login" />
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
