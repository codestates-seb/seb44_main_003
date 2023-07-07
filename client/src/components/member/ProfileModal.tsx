import { styled } from 'styled-components';
import { BiX } from 'react-icons/bi';
import { useSetRecoilState } from 'recoil';
import { profileModalState } from '../../recoil/atoms/Atoms';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { PatchUser } from '../../api/api';
import { profileImgs } from '../authentication/SignupForm';
import { NewMember } from '../../types/types';

function ProfileModal() {
  const setShowModal = useSetRecoilState(profileModalState);
  const queryClient = useQueryClient();
  const user = useQuery(['user']).data as NewMember;
  const mutationPatch = useMutation(PatchUser, {
    onSuccess: () => {
      setShowModal(false);
      queryClient.invalidateQueries(['user']);
    },
  });
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLImageElement;
    mutationPatch.mutate({ ...user, avatarUri: target.src });
  };

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
        {profileImgs.map((profile, index) => (
          <img
            key={index}
            src={`https://ott-main-project.s3.ap-northeast-2.amazonaws.com/${profile}.png`}
            alt={profile}
            onClick={handleClick}
          />
        ))}
      </div>
    </S_Modal>
  );
}

export default ProfileModal;

const S_Modal = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 700px;
  height: 500px;
  border-radius: 10px;
  border: 1px solid var(--color-white-80);
  background: #282f39;
  color: #fff;
  font-size: 30px;
  z-index: 9999;
  > svg {
    align-self: flex-end;
    margin: 15px 15px 0 0;
    cursor: pointer;
  }
  > h1 {
    font-size: 26px;
    margin-bottom: 10px;
  }
  > h2 {
    font-size: 22px;
    font-weight: 400;
    color: var(--color-white-80);
  }
  > div {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    width: 420px;

    > img {
      width: 140px;
      height: 140px;
      border-radius: 5px;
      margin-bottom: 20px;
    }
  }
`;
