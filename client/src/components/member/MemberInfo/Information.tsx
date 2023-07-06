import { useQuery, useMutation } from '@tanstack/react-query';
import { GetUser, PatchUser, DeleteUser } from '../../../api/api';
import { styled } from 'styled-components';
import { HiPencil } from 'react-icons/hi';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { profileModalState } from '../../../recoil/atoms/Atoms';
import { useQueryClient } from '@tanstack/react-query';
import { logout } from '../../header/Dropdown';

function Information() {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [userInput, setUserInput] = useState('');
  const setShowModal = useSetRecoilState(profileModalState);
  const handleEdit = () => {
    setIsEditing(!isEditing);
  };
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutationPatch.mutate({
      ...data,
      nickname: userInput,
    });
  };
  const { isLoading, data, error, isSuccess } = useQuery({
    queryKey: ['user'],
    queryFn: GetUser,
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const mutationPatch = useMutation(PatchUser, {
    onSuccess: () => queryClient.invalidateQueries(['user']),
  });

  const mutationDelete = useMutation(DeleteUser, {
    onSuccess: () => logout(),
  });

  const handleDelete = () => {
    const confirm = window.confirm(
      '정말로 회원 정보를 모두 삭제하시겠습니까? 삭제 후에는 복구가 불가능합니다.'
    );
    confirm && mutationDelete.mutate();
  };

  if (isLoading) return <S_Wrapper>Loading..</S_Wrapper>;
  if (error instanceof Error)
    return <S_Wrapper>Error:{error.message}</S_Wrapper>;
  if (isSuccess) {
    const memberSince = new Date(data.createdAt);
    const currentDate = new Date();
    const timeDiff = currentDate.getTime() - memberSince.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return (
      <S_Wrapper>
        {isEditing ? (
          <form className="flex" onSubmit={handleSubmit}>
            <input
              type="text"
              name="userNickname"
              defaultValue={data.nickname}
              className="border-b border-gray-300 w-[100px] mr-4"
              onChange={handleInput}
              autoFocus
            />
            <button type="submit">Save</button>
            <button onClick={handleEdit}>Cancel</button>
          </form>
        ) : (
          <h1>
            {data.nickname}
            <HiPencil onClick={handleEdit} />
          </h1>
        )}
        <p>
          <div>가입일 : {data.createdAt} </div>
          <span>|</span> <div>조잉에 함께한 지 {daysDiff}일 째입니다</div>
        </p>
        <S_Div>
          <div>
            <button
              type="button"
              onClick={() => {
                setShowModal(true);
              }}
            >
              프로필 변경
            </button>
            <button type="button">선호도 변경</button>
          </div>
          <button type="button" onClick={handleDelete}>
            회원 탈퇴
          </button>
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
  padding: 0 30px;

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
    > input {
      font-size: 32px;
      font-weight: 700;
      width: 200px;
      padding: 5px;
      border-radius: 5px;
      @media only screen and (max-width: 700px) {
        display: block;
        margin-bottom: 10px;
      }
    }
    > button {
      width: 80px;
      height: 30px;
      margin: 0 10px;
      border: 1px solid white;
      border-radius: 5px;
    }
    > button:nth-child(2) {
      background-color: var(--color-primary-yellow);
      color: var(--color-bg-100);
    }
  }
  > p {
    font-size: 18px;
    color: var(--color-white-80);
    @media only screen and (max-width: 480px) {
      font-size: 14px;
    }
    > div {
      margin: 10px 0;
      @media only screen and (min-width: 800px) {
        display: inline;
      }
    }
    > span {
      margin: 0 3px;
      @media only screen and (max-width: 800px) {
        display: none;
      }
    }
  }
`;

const S_Div = styled.div`
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: 800px) {
    transform: translate(-200px, 65px);
  }
  @media only screen and (max-width: 480px) {
    transform: translate(-100px, 35px);
  }
  > button {
    width: 140px;
    height: 36px;
    border-radius: 5px;
    border: 1px solid #fff;
    flex-shrink: 0;
    margin-left: 10px;
    @media only screen and (max-width: 480px) {
      width: 100px;
      height: 30px;
    }
  }
  > div {
    flex-shrink: 0;
    > button {
      width: 140px;
      height: 36px;
      border-radius: 5px;
      border: 1px solid #fff;
      @media only screen and (max-width: 480px) {
        width: 100px;
        height: 30px;
      }
    }
    > button:first-child {
      margin-right: 10px;
    }
  }
`;
