import styled from 'styled-components';
import FirstQuestion from '../components/modal/questions/FirstQuestion';
import SecondQuestion from '../components/modal/questions/SecondQuestion';
import ThirdQuestion from '../components/modal/questions/ThirdQuestion';

const Recommend = () => {
  return (
    <S_Wrapper>
      <FirstQuestion/>
      <SecondQuestion/>
      <ThirdQuestion/>
    </S_Wrapper>
  )
}

export default Recommend

const S_Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100vw;
`;
