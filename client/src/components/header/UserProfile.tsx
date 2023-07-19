import { useQuery } from '@tanstack/react-query';
import { BiError } from 'react-icons/bi';
import { GetUser } from '../../api/api';
import { styled } from 'styled-components';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Dropdown from './Dropdown';
import useIsLoggedIn from '../../hooks/useIsLoggedIn';

function UserProfile() {
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  const isLoggedIn = useIsLoggedIn();

  useEffect(() => {
    setShowDropdown(false);
  }, [location]);

  const { isLoading, data, error, isSuccess } = useQuery({
    queryKey: ['user'],
    queryFn: GetUser,
    enabled: isLoggedIn,
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
      <S_ProfileWrapper
        onMouseOver={() => setShowDropdown(true)}
        onMouseOut={() => setShowDropdown(false)}
      >
        <img src={data.avatarUri} alt="user" />
        {showDropdown && (
          <Dropdown
            avatarUri={data.avatarUri}
            nickname={data.nickname}
            setShowDropdown={setShowDropdown}
          />
        )}
      </S_ProfileWrapper>
    );
}

export default UserProfile;

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
