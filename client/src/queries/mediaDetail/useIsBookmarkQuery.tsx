import { useQuery } from '@tanstack/react-query';
import { GetIsBookmark } from '@/api/api';

const useIsBookmarkQuery = (contentId: string) => {
  return useQuery(['isBookmarked', contentId], () => GetIsBookmark(contentId));
};

export default useIsBookmarkQuery;
