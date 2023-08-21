import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { GetTVData, GetMovieData } from '@/api/api';

type Path = 'tv' | 'movie';

const useGenreCarouselData = (genre: string, path: Path) => {
  return useQuery({
    queryKey:
      path === 'tv'
        ? ['tvGenreCarousel', genre]
        : ['movieGenreCarousel', genre],
    queryFn: () => (path === 'tv' ? GetTVData(genre) : GetMovieData(genre)),
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
};

export default useGenreCarouselData;
