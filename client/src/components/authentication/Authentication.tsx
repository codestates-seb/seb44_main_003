import { styled } from 'styled-components';
import Logo from './Logo';
import { useLocation } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import SocialLogin from './SocialLogin';
import AdditionalInfo from './AdditionalInfo';

function Authentication() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  return (
    <S_Wrapper>
      <Logo />
      {isLoginPage ? <LoginForm /> : <SignupForm />}
      <SocialLogin isLoginPage={isLoginPage} />
      <AdditionalInfo isLoginPage={isLoginPage} />
    </S_Wrapper>
  );
}

const S_Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;
  width: 420px;
  background-color: #d9d9d933;
  backdrop-filter: blur(3px);
  border: 1px solid #ffffff4d;
  border-radius: 10px;
  color: var(--color-white-80);
  @media only screen and (max-width: 480px) {
    width: 360px;
  }
  & form {
    display: flex;
    flex-direction: column;
    align-items: center;

    > div {
      position: relative;
    }
    div.error {
      color: var(--color-primary-yellow);
      font-size: 14px;
      margin-top: 7px;
    }
    & svg {
      position: absolute;
      top: 53%;
      right: 20px;
      transform: translate(50%, 50%);
      font-size: 20px;
    }
  }
  & label {
    display: block;
    font-weight: 400;
    margin-top: 20px;
    margin-bottom: 5px;
  }
  & input {
    width: 300px;
    height: 40px;
    padding: 3px 8px;
    font-size: 18px;
    color: white;
    border-radius: 5px;
    background-color: #d9d9d933;
    backdrop-filter: blur(3px);
    border: 1px solid #ffffff4d;
    @media only screen and (max-width: 480px) {
      font-size: 14px;
    }
  }
  & input:focus {
    border: 1px solid #dede00;
  }
  & input.error {
    border: 1px solid rgba(255, 0, 0, 0.7);
    background-color: #ff00004d;
    animation: vibration 0.1s 3;

    @keyframes vibration {
      from {
        transform: translate(2px, 0);
      }
      to {
        transform: translate(-2px, 0);
      }
    }
  }

  & button {
    width: 300px;
    height: 45px;
    border-radius: 10px;
    border: 1px solid #ffffff4d;
    background-color: #ffff0033;
    margin-top: 25px;
  }

  & button:hover {
    background-color: #ffff0060;
  }

  & a {
    font-weight: 700;
  }
`;

export default Authentication;
