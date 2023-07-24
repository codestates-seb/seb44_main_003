import MemberInfo from '../components/member/MemberInfo/MemberInfo';
import MemberContents from '../components/member/memberContents/MemberContents';
import ProfileModal from '../components/member/profileModal/ProfileModal';
import { useRecoilValue } from 'recoil';
import { profileModalState } from '../recoil/atoms/Atoms';
import { styled } from 'styled-components';

function Member() {
  const showModal = useRecoilValue(profileModalState);
  return (
    <S_Wrapper>
      <MemberInfo />
      <MemberContents />
      {showModal && <ProfileModal />}
    </S_Wrapper>
  );
}

export default Member;

const S_Wrapper = styled.div`
  width: 100vw;
  padding: 0 60px;
  @media only screen and (max-width: 770px) {
    padding: 0 20px;
  }
`;
