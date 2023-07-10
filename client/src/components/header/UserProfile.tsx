import { useQuery } from '@tanstack/react-query';
import { BiError } from 'react-icons/bi';
import { GetUser } from '../../api/api';
import { styled } from 'styled-components';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Dropdown from './Dropdown';

function UserProfile() {
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setShowDropdown(false);
  }, [location]);

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
        <button
          onClick={() => {
            setShowDropdown(!showDropdown);
          }}
        />
        <a href="/member">
          <BiError />
        </a>
      </S_ProfileWrapper>
    );

  if (isSuccess)
    return (
      <S_ProfileWrapper>
        <img
          src={data.avatarUri}
          alt="user"
          onClick={() => setShowDropdown(!showDropdown)}
        />
        {showDropdown && (
          <Dropdown avatarUri={data.avatarUri} nickname={data.nickname} />
        )}
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
  margin-left: 40px;

  > a {
    color: var(--color-white-60);
    font-size: 25px;
  }
  > img {
    border-radius: 5px;
  }
`;
