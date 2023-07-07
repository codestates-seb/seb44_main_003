import RecommendModel from '../components/modal/RecommendModal';
import styled from 'styled-components';

const Recommend = () => {
  return (
    <S_Wrapper>
      <RecommendModel/>
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
