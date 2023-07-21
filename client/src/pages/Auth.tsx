import { styled } from 'styled-components';
import Authentication from '../components/authentication/Authentication';

function Auth() {
  return (
    <S_main>
      <Authentication />
      <img src="https://ott-main-project.s3.ap-northeast-2.amazonaws.com/main_background.webp" />
    </S_main>
  );
}

export default Auth;

const S_main = styled.main`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  > img {
    position: fixed;
    transform: translate(-50%, 50%) scale(3.7);
    animation-delay: 0.1s;
    animation: backgroundChange 1.2s ease;
    z-index: -1;
    @media only screen and (max-width: 600px) {
      transform: translate(-50%, 50%) scale(6);
      animation: mediaBackgroundChange 1.2s ease;
    }
    @keyframes backgroundChange {
      from {
        filter: brightness(0);
        transform: translate(-40%, 40%) scale(3.7);
      }
      to {
        filter: brightness(100%);
        transform: translate(-50%, 50%) scale(3.7);
      }
    }
    @keyframes mediaBackgroundChange {
      from {
        filter: brightness(0);
        transform: translate(-40%, 40%) scale(6);
      }
      to {
        filter: brightness(100%);
        transform: translate(-50%, 50%) scale(6);
      }
    }
  }
`;
