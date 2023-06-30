import { useQuery } from '@tanstack/react-query';
import { BiError } from 'react-icons/bi';
import { GetUser } from '../../api/api';
import { styled } from 'styled-components';

function UserProfile() {
  const { isLoading, data, error } = useQuery({
    queryKey: ['user'],
    queryFn: GetUser,
  });
  console.log(data);
  if (isLoading)
    return (
      <div className="lds-ellipsis">
        <div />
        <div />
        <div />
        <div />
      </div>
    );
  if (error instanceof Error)
    return (
      <a href="/member">
        <BiError className="text-2xl text-gray-500" />
      </a>
    );
  return (
    <a href="/member">
      <S_ProfileWrapper src={data.avatarUri} alt="user" />
    </a>
  );
}

export default UserProfile;

const S_ProfileWrapper = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  margin-left: 40px;
`;
