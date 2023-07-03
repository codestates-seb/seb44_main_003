import { styled } from 'styled-components';
import bgImg from '../assets/main_background.png';

const Login = () => {
  return <S_main></S_main>;
};

export default Login;

const S_main = styled.main`
  background-image: url(${bgImg});
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  width: 100%;
  height: 100%;
`;
