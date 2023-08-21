import { useQuery } from '@tanstack/react-query';
import { GetIsRecommend } from '@/api/api';

const useIsRecommendQuery = (contentId: string) => {
  return useQuery(['isRecommend', contentId], () => GetIsRecommend(contentId));
};

export default useIsRecommendQuery;
