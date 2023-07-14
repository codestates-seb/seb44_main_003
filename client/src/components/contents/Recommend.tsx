import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa';
import { GetIsRecommend, PostRecommend } from '../../api/api';
import useIsLoggedIn from './../../hooks/useIsLoggedIn';
import { S_IconWrapper } from '../../styles/style';
import { RecommendLoading, RecommendError } from '../ui/exceptions/recommend';

function Recommend({
  countRecommend,
  contentId,
}: {
  countRecommend: number;
  contentId: string;
}) {
  const queryClient = useQueryClient();
  const isLoggedIn = useIsLoggedIn();

  if (!isLoggedIn) {
    return (
      <S_IconWrapper>
        <div>
          <FaRegThumbsUp
            color="white"
            size="40"
            onClick={() => alert('로그인 후 이용 가능합니다')}
          />
          <p>추천</p>
        </div>
        <p>{countRecommend}</p>
      </S_IconWrapper>
    );
  }

  const { isLoading, data, error, isSuccess } = useQuery(
    ['isRecommend', contentId],
    () => GetIsRecommend(contentId),
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
      enabled: isLoggedIn,
    }
  );

  const RecommendMutation = useMutation({
    mutationFn: (contentId: string) => PostRecommend(contentId),
    onSuccess: () => {
      queryClient.invalidateQueries(['isRecommend', contentId]);
      queryClient.invalidateQueries(['selectedContent', contentId]);
    },
    onError(error) {
      console.error('로그인 안한 상태', error);
    },
  });

  if (isLoading) {
    return <RecommendLoading countRecommend={countRecommend} />;
  }

  if (error) {
    return <RecommendError countRecommend={countRecommend} />;
  }

  if (isSuccess) {
    return (
      <S_IconWrapper>
        <div>
          {data ? (
            <FaThumbsUp
              color="white"
              size="40"
              className="isTrue"
              onClick={() => RecommendMutation.mutate(contentId)}
            />
          ) : (
            <FaRegThumbsUp
              color="white"
              size="40"
              onClick={() => RecommendMutation.mutate(contentId)}
            />
          )}
          <p>추천</p>
        </div>
        <p className={data ? 'isTrue' : ''}>{countRecommend}</p>
      </S_IconWrapper>
    );
  }
}

export default Recommend;
