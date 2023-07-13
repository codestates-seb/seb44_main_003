import { styled } from 'styled-components';
import { profileImgs } from '../../authentication/SignupForm';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PatchUser } from '../../../api/api';
import { NewMember } from '../../../types/types';
import { useSetRecoilState } from 'recoil';
import { profileModalState } from '../../../recoil/atoms/Atoms';
import profileAdd from '../../../assets/profiles/profileAdd.svg';

function DefaultImgs({
  setIsUploading,
}: {
  setIsUploading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const queryClient = useQueryClient();
  const setShowModal = useSetRecoilState(profileModalState);
  const user = useQuery(['user']).data as NewMember;
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLImageElement;
    mutationPatch.mutate({ ...user, avatarUri: target.src });
  };
  const mutationPatch = useMutation(PatchUser, {
    onSuccess: () => {
      setShowModal(false);
      queryClient.invalidateQueries(['user']);
    },
  });
  return (
    <S_Wrapper>
      <S_ImgDiv>
        {profileImgs.map((profile, index) => (
          <img
            key={index}
            src={`https://ott-main-project.s3.ap-northeast-2.amazonaws.com/${profile}.png`}
            alt={profile}
            onClick={handleClick}
          />
        ))}
      </S_ImgDiv>
      <div className="add">
        <img src={profileAdd} onClick={() => setIsUploading(true)} />
        <p>프로필 추가</p>
      </div>
    </S_Wrapper>
  );
}

export default DefaultImgs;

const S_Wrapper = styled.div`
  display: flex;
  align-items: center;
  & p {
    font-size: 16px;
    margin-top: 5px;
  }
  & div.add {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    width: 130px;
  }
`;
const S_ImgDiv = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 420px;

  & img {
    width: 140px;
    height: 140px;
    border-radius: 5px;
    margin-bottom: 20px;
    cursor: pointer;
  }
  & img:hover {
    filter: brightness(110%);
  }
  & img:active {
    filter: brightness(90%);
  }
`;