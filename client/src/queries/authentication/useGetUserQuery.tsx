import { useQuery } from '@tanstack/react-query';
import { GetUser } from '@/api/api';

const useGetUserQuery = () => {
  const getUserQuery = useQuery(['user'], GetUser, { enabled: false });
  return getUserQuery;
};

export default useGetUserQuery;
