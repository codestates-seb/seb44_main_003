import { AxiosError } from 'axios';
import { BiError } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import useMemberQuery from '@/queries/member/useMemberQuery';

function MemberProfile() {
  const navigate = useNavigate();
  const { isLoading, data, error, isSuccess } = useMemberQuery(true);
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
        <img src={data!.avatarUri} alt="member" />
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
