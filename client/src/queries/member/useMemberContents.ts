import { useQuery } from '@tanstack/react-query';
import { GetMemberContents } from '@/api/api';

const useMemberContents = (path: string) => {
  const { data, isSuccess, isStale, refetch } = useQuery({
    queryKey: ['userContents', path],
    queryFn: () => GetMemberContents(path),
  });
  return { data, isSuccess, isStale, refetch };
};

export default useMemberContents;
