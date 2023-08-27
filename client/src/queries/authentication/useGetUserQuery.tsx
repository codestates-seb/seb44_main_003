import { useQuery } from '@tanstack/react-query';
import { GetMember } from '@/api/api';

const useGetUserQuery = () => {
  const getUserQuery = useQuery(['user'], GetMember, { enabled: false });
  return getUserQuery;
};

export default useGetUserQuery;
