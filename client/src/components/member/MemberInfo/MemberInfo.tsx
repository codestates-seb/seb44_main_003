import { styled } from 'styled-components';
import MemberProfile from './MemberProfile';
import Information from './Information';

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
  padding: 0 40px;
  display: flex;
  width: 100%;
  color: white;
  margin-top: 65px;
`;
