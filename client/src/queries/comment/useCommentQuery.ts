import { useQuery } from '@tanstack/react-query';
import { GetComments } from '@/api/api';

const useCommentQuery = (id: string, page: number) => {
  const { data, isSuccess, isLoading, isFetching } = useQuery({
    queryKey: ['comments', id, page],
    queryFn: () => GetComments({ id, page }),
    refetchOnWindowFocus: false,
    staleTime: 0,
    cacheTime: 0,
  });
  return { data, isSuccess, isLoading, isFetching };
};

export default useCommentQuery;
