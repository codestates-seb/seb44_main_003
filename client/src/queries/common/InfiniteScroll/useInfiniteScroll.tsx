import { useInfiniteQuery } from '@tanstack/react-query';
import { GetFilterdData, GetSearchedData } from '@/api/api';

const useInfiniteScroll = (
  path: string,
  query: string,
  size: number,
  category: string
) => {
  const infiniteScroll = useInfiniteQuery(
    path.includes('search') ? ['search', query] : ['selectedList', query],
    ({ pageParam = 1 }) =>
      path.includes('search')
        ? GetSearchedData(`${query}&page=${pageParam}&size=${size}`)
        : GetFilterdData(
            `/medias${category}?page=${pageParam}&size=${size}&${query}`
          ),
    {
      getNextPageParam: (lastPage) => {
        const currentPage = lastPage.currentPage;
        const totalPages = lastPage.totalPages;
        if (currentPage < totalPages) {
          return currentPage + 1;
        }

        return undefined;
      },
    }
  );
  return infiniteScroll;
};

export default useInfiniteScroll;
