import { useQuery } from '@tanstack/react-query';
import { BiError } from 'react-icons/bi';
import { GetUser } from '../../../api/api';
import { styled } from 'styled-components';

function MemberProfile() {
  const { isLoading, data, error, isSuccess } = useQuery({
    queryKey: ['user'],
    queryFn: GetUser,
    staleTime: Infinity,
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
        <BiError />
      </S_ProfileWrapper>
    );

  if (isSuccess)
    return (
      <S_ProfileWrapper>
        <img src={data.avatarUri} alt="member" />
      </S_ProfileWrapper>
    );
}

export default MemberProfile;

const S_ProfileWrapper = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 160px;
  > img {
    border-radius: 10px;
    width: 160px;
    height: 160px;
  }
`;
