import { styled } from 'styled-components';

function Ad() {
  return <S_Wrapper>광고예용</S_Wrapper>;
}

export default Ad;

const S_Wrapper = styled.div`
  width: 100%;
  height: 100px;
  margin-top: 65px;
  @media only screen and (max-width: 480px) {
    height: 70px;
    margin-top: 30px;
  }
`;
