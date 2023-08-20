import { useQuery } from '@tanstack/react-query';
import { GetMember } from '@/api/api';

const useMemberQuery = (enabled: boolean) => {
  const { isLoading, data, error, isSuccess } = useQuery({
    queryKey: ['member'],
    queryFn: GetMember,
    enabled: enabled,
  });
  return { isLoading, data, error, isSuccess };
};

export default useMemberQuery;
