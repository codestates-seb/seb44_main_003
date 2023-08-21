import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRecoilValue } from 'recoil';
import { GetFilterdData, GetUser } from '@/api/api';
import { recommendedContentsState } from '@/recoil/atoms/Atoms';

const useQuestionResultData = (isLoggedIn: boolean) => {
  const recommendedContents = useRecoilValue(recommendedContentsState);

  const filterDataResult = useQuery({
    queryKey: ['recommendedFilter', recommendedContents],
    queryFn: () =>
      GetFilterdData(
        `/medias/${
          recommendedContents.category
        }?genre=${recommendedContents.interests.join(
          ','
        )}&ott=${recommendedContents.memberOtts.join(',')}`
      ),
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

  const userDataResult = useQuery({
    queryKey: ['user'],
    queryFn: GetUser,
    enabled: isLoggedIn,
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

  return { filterDataResult, userDataResult };
};

export default useQuestionResultData;
