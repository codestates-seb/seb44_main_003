import { styled } from 'styled-components';
import bgImg from '../assets/main_background.png';
import Authentication from '../components/authentication/FormContainer';

const Signup = () => {
  return (
    <S_main>
      <Authentication />
    </S_main>
  );
};

export default Signup;

const S_main = styled.main`
  background-image: url(${bgImg});
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;
