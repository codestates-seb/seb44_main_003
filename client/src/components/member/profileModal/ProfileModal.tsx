import { useState } from 'react';
import { BiX } from 'react-icons/bi';
import { useSetRecoilState } from 'recoil';
import DefaultImgs from '@/components/member/profileModal/DefaultImgs';
import ImgUpload from '@/components/member/profileModal/ImgUpload';
import { profileModalState } from '@/recoil/atoms/Atoms';
import { S_Modal } from '@/styles/style';

function ProfileModal() {
  const [isUploading, setIsUploading] = useState(false);
  const setShowModal = useSetRecoilState(profileModalState);
  return (
    <S_Modal>
      <BiX
        onClick={() => {
          setShowModal(false);
        }}
      />
      <h1>프로필 선택</h1>
      <h2>사용할 프로필을 선택해주세요.</h2>
      <div>
        {isUploading ? (
          <ImgUpload />
        ) : (
          <DefaultImgs setIsUploading={setIsUploading} />
        )}
      </div>
    </S_Modal>
  );
}

export default ProfileModal;
