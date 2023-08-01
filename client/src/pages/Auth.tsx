import { styled } from 'styled-components';
import Authentication from '../components/authentication/Authentication';

function Auth() {
  return (
    <S_main>
      <Authentication />
      <img src={`${import.meta.env.VITE_IMAGE_URL}/login_background.webp`} />
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
    transform: rotate(40deg) translate(10%, 10%) scale(2);
    opacity: 0.15;
    animation-delay: 0.1s;
    animation: backgroundChange 1.2s ease;
    z-index: -1;
    @media only screen and (max-width: 600px) {
      transform: rotate(40deg) translate(10%, 10%) scale(4);
      animation: mediaBackgroundChange 1.2s ease;
    }
    @keyframes backgroundChange {
      from {
        filter: brightness(0);
        transform: rotate(40deg) translate(20%, -20%) scale(2);
      }
      to {
        filter: brightness(100%);
        transform: rotate(40deg) translate(10%, 10%) scale(2);
      }
    }
    @keyframes mediaBackgroundChange {
      from {
        filter: brightness(0);
        transform: rotate(40deg) translate(20%, -20%) scale(4);
      }
      to {
        filter: brightness(100%);
        transform: rotate(40deg) translate(10%, 10%) scale(4);
      }
    }
  }
`;
