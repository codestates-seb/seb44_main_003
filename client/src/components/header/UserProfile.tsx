import { useQuery } from '@tanstack/react-query';
import { BiError } from 'react-icons/bi';
import { GetUser } from '../../api/api';
import { styled } from 'styled-components';

function UserProfile() {
  const { isLoading, data, error, isSuccess } = useQuery({
    queryKey: ['user'],
    queryFn: GetUser,
    staleTime: 5 * 60 * 1000,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
  });

  if (isLoading)
    return (
      <S_ProfileWrapper>
        <div className="lds-ellipsis">
          <div />
          <div />
          <div />
          <div />
        </div>
      </S_ProfileWrapper>
    );

  if (error instanceof Error)
    return (
      <S_ProfileWrapper>
        <a href="/member">
          <BiError />
        </a>
      </S_ProfileWrapper>
    );

  if (isSuccess)
    return (
      <S_ProfileWrapper>
        <a href="/member">
          <img src={data.avatarUri} alt="user" />
        </a>
      </S_ProfileWrapper>
    );
}

export default UserProfile;

const S_ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 5px;
  margin-left: 40px;

  > a {
    color: var(--color-white-60);
    font-size: 25px;
  }
`;
