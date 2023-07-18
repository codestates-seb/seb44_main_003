import MemberInfo from '../components/member/MemberInfo/MemberInfo';
// import Ad from '../components/member/Ad';
import MemberContents from '../components/member/memberContents/MemberContents';
import ProfileModal from '../components/member/profileModal/ProfileModal';
import { useRecoilValue } from 'recoil';
import { profileModalState } from '../recoil/atoms/Atoms';

function Member() {
  const showModal = useRecoilValue(profileModalState);
  return (
    <>
      <MemberInfo />
      {/* <Ad /> */}
      <MemberContents />
      {showModal && <ProfileModal />}
    </>
  );
}

export default Member;
