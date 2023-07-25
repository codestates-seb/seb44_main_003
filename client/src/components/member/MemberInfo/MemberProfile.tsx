import { useQuery } from '@tanstack/react-query';
import { BiError } from 'react-icons/bi';
import { GetUser } from '../../../api/api';
import { styled } from 'styled-components';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

function MemberProfile() {
  const navigate = useNavigate();
  const { isLoading, data, error, isSuccess } = useQuery({
    queryKey: ['user'],
    queryFn: GetUser,
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

  if (error instanceof AxiosError) {
    if (!error.status && error.code === 'ERR_NETWORK') navigate('/error');
    else
      return (
        <S_ProfileWrapper>
          <BiError />
        </S_ProfileWrapper>
      );
  }

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
