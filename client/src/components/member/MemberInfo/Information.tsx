/* eslint-disable jsx-a11y/no-autofocus */
import { AxiosError } from 'axios';
import { useState } from 'react';
import { HiPencil } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { styled } from 'styled-components';
import Button from '@/components/@common/button/Button';
import MemberLikesModal from '@/components/member/MemberLikesModal';
import { useModal } from '@/hooks/useModal';
import useMemberDelete from '@/queries/member/useMemberDelete';
import useMemberMutation from '@/queries/member/useMemberMutation';
import useMemberQuery from '@/queries/member/useMemberQuery';
import { profileModalState } from '@/recoil/atoms/Atoms';
import { notifyError } from '@/utils/notify';

function Information() {
  const [isEditing, setIsEditing] = useState(false);
  const [userInput, setUserInput] = useState('');
  const setShowModal = useSetRecoilState(profileModalState);
  const navigate = useNavigate();
  const { openModal } = useModal();
  const handleEdit = () => {
    if (!isEditing) {
      setUserInput(data!.nickname);
    }
    setIsEditing(!isEditing);
  };
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userInput.length < 2 || userInput.length > 10) {
      notifyError('닉네임은 2~10자여야 합니다.');
      return;
    }
    mutationPatch.mutate({
      ...data,
      nickname: userInput,
    });
    setIsEditing(false);
  };
  const { isLoading, data, error, isSuccess } = useMemberQuery(true);

  const mutationPatch = useMemberMutation();
  const mutationDelete = useMemberDelete();

  const handleDelete = () => {
    const confirm = window.confirm(
      '정말로 회원 정보를 모두 삭제하시겠습니까? 삭제 후에는 복구가 불가능합니다.'
    );
    confirm && mutationDelete.mutate();
  };

  if (isLoading) return <S_Wrapper>Loading..</S_Wrapper>;

  if (error instanceof AxiosError) {
    if (!error.status && error.code === 'ERR_NETWORK') navigate('/error');
  }
  if (isSuccess) {
    const memberSince = new Date(data!.createdAt);
    const currentDate = new Date();
    const timeDiff = currentDate.getTime() - memberSince.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return (
      <S_Wrapper>
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="userNickname"
              defaultValue={data!.nickname}
              className="border-b border-gray-300 w-[100px] mr-4"
              onChange={handleInput}
              autoFocus
            />
            <div>
              <Button type="submit" variant="primary">
                저장
              </Button>
              <Button onClick={handleEdit}>취소</Button>
            </div>
          </form>
        ) : (
          <h1>
            {data!.nickname}
            <HiPencil onClick={handleEdit} />
          </h1>
        )}
        <div className="member-since">
          <p>가입일 : {data!.createdAt.substring(0, 10)} </p>
          <span>|</span> <p>조잉에 함께한 지 {daysDiff}일 째입니다</p>
        </div>
        <S_Div>
          <div>
            <Button
              onClick={() => {
                setShowModal(true);
              }}
              variant="solid"
            >
              프로필 변경
            </Button>
            <Button
              onClick={() =>
                openModal({
                  content: <MemberLikesModal />,
                })
              }
              variant="solid"
            >
              선호도 변경
            </Button>
          </div>
          <div className="button-wrapper">
            <Button onClick={handleDelete} variant="solid">
              회원 탈퇴
            </Button>
          </div>
        </S_Div>
      </S_Wrapper>
    );
  }
}

export default Information;

const S_Wrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 0 30px;
  @media only screen and (max-width: 600px) {
    margin: 15px 0 0 0;
  }
  > h1 {
    display: flex;
    align-items: center;
    font-size: 32px;
    font-weight: 700;
    @media only screen and (max-width: 480px) {
      font-size: 20px;
    }
    > svg {
      margin-left: 10px;
      cursor: pointer;
    }
  }

  > form {
    display: flex;
    align-items: center;
    @media only screen and (max-width: 770px) {
      height: 40px;
    }
    > input {
      font-size: 30px;
      font-weight: 700;
      width: 200px;
      padding: 5px;
      border-radius: 5px;
      @media only screen and (max-width: 770px) {
        font-size: 20px;
        width: 100px;
        display: block;
        margin-bottom: 10px;
      }
    }
    > div {
      display: flex;
      align-items: center;
      margin: 0 20px;
      gap: 15px;
      width: 150px;
      height: 70%;
    }
  }
  & div.member-since {
    font-size: 18px;
    color: var(--color-white-80);
    @media only screen and (max-width: 480px) {
      font-size: 14px;
    }
    > p {
      margin: 10px 0;
      @media only screen and (min-width: 770px) {
        display: inline;
      }
    }
    > span {
      margin: 0 3px;
      @media only screen and (max-width: 770px) {
        display: none;
      }
    }
  }
`;

const S_Div = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
  > div {
    display: flex;
    flex-shrink: 0;
    width: 250px;
    height: 30px;
    gap: 15px;
    @media only screen and (max-width: 600px) {
      width: 200px;
    }
  }
  > div.button-wrapper {
    width: 115px;
    @media only screen and (max-width: 600px) {
      width: 90px;
    }
  }
`;
