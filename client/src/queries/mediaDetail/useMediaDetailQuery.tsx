import { useQuery } from '@tanstack/react-query';
import { GetMediaDetail } from '@/api/api';

const useMediaDetailQuery = (contentId: string) => {
  return useQuery(['selectedContent', contentId], () =>
    GetMediaDetail(contentId)
  );
};

export default useMediaDetailQuery;
