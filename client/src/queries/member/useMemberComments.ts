import { useQuery } from '@tanstack/react-query';
import { GetMemberComments } from '@/api/api';

const useMemberComments = (page: number) => {
  const { data, isSuccess } = useQuery({
    queryKey: ['comments', page],
    queryFn: () => GetMemberComments(page),
    refetchOnWindowFocus: false,
  });
  return { data, isSuccess };
};

export default useMemberComments;
