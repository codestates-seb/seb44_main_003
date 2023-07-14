import { styled } from 'styled-components';
import Authentication from '../components/authentication/FormContainer';

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
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  > img {
    position: absolute;
    transform: translate(-50%, 50%) scale(3.7);
    animation-delay: 0.1s;
    animation-direction: normal;
    animation-fill-mode: forwards;
    animation: backgroundChange 1.2s ease;
    z-index: -1;
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
  }
`;
