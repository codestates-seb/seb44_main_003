import { AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import { BiError } from 'react-icons/bi';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import Dropdown from '@/components/@layout/header/Dropdown';
import useMemberQuery from '@/queries/member/useMemberQuery';
import checkLogin from '@/utils/checkLogin';

function MemberProfile() {
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  const isLoggedIn = checkLogin();

  const navigate = useNavigate();

  useEffect(() => {
    setShowDropdown(false);
  }, [location]);

  const { isLoading, data, error, isSuccess } = useMemberQuery(isLoggedIn);

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
      <S_ProfileWrapper
        onMouseOver={() => setShowDropdown(true)}
        onMouseOut={() => setShowDropdown(false)}
      >
        <img src={data!.avatarUri} alt="user" />
        {showDropdown && (
          <Dropdown
            avatarUri={data!.avatarUri}
            nickname={data!.nickname}
            setShowDropdown={setShowDropdown}
          />
        )}
      </S_ProfileWrapper>
    );
}

export default MemberProfile;

const S_ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 50px;
  margin-left: 30px;
  padding: 10px;
  height: 100%;
  > svg {
    color: var(--color-white-60);
    font-size: 25px;
  }
  > img {
    border-radius: 5px;
    width: 30px;
    height: 30px;
  }
`;
