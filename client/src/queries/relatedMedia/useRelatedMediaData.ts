import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { GetMediaDetail, GetFilterdData } from '@/api/api';
import { ContentData } from '@/types/types';

type DetailData = {
  category: string;
  genre: string[];
};

const useRelatedMediaData = (contentId: string) => {
  const detailDataResult = useQuery<DetailData, AxiosError>({
    queryKey: ['selectedContent', contentId],
    queryFn: () => GetMediaDetail(contentId),
    onError: (error: AxiosError) => {
      if (
        error instanceof AxiosError &&
        !error.status &&
        error.code === 'ERR_NETWORK'
      ) {
        throw error;
      }
    },
  });

  const getCategory = () => {
    return detailDataResult.data?.category === 'TV' ? 'tv' : 'movie';
  };

  const filteredDataResult = useQuery<{ content: ContentData[] }, AxiosError>({
    queryKey: ['filteredContent', contentId],
    queryFn: () =>
      GetFilterdData(
        `/medias/${getCategory()}?genre=${detailDataResult.data?.genre.join(
          ','
        )}`
      ),
    enabled: !!detailDataResult.data,
    onError: (error: AxiosError) => {
      if (
        error instanceof AxiosError &&
        !error.status &&
        error.code === 'ERR_NETWORK'
      ) {
        throw error;
      }
    },
  });

  return { detailDataResult, filteredDataResult };
};

export default useRelatedMediaData;
