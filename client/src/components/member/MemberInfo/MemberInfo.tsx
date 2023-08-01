import { styled } from 'styled-components';
import Information from './Information';
import MemberProfile from './MemberProfile';

function MemberInfo() {
  return (
    <S_Wrapper>
      <MemberProfile />
      <Information />
    </S_Wrapper>
  );
}

export default MemberInfo;

const S_Wrapper = styled.div`
  display: flex;
  width: 100%;
  color: white;
  margin-top: 150px;
  @media only screen and (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    margin-top: 100px;
  }
`;
