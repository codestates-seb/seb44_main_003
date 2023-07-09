import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa';
import { GetIsRecommend, PostRecommend } from '../../api/api';
import useIsLoggedIn from './../../hooks/useIsLoggedIn';
import { S_IconWrapper } from '../../styles/style';

const Recommend = ({
  countRecommend,
  contentId,
}: {
  countRecommend: number;
  contentId: string;
}) => {
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
    onSuccess(data) {
      if (data.status === 201) {
        queryClient.invalidateQueries(['isRecommend', contentId]);
        queryClient.invalidateQueries(['selectedContent', contentId]);
      }
    },
    onError(error) {
      console.error('로그인 안한 상태', error);
    },
  });

  if (isLoading) {
    return (
      <S_IconWrapper>
        <div>
          <FaRegThumbsUp color="white" size="40" />
          <p>추천</p>
        </div>
        <p>{countRecommend}</p>
      </S_IconWrapper>
    );
  }

  if (error) {
    return (
      <S_IconWrapper>
        <div>
          <FaRegThumbsUp
            color="white"
            size="40"
            onClick={() => alert('네트워크 에러')}
          />
          <p>추천</p>
        </div>
        <p>{countRecommend}</p>
      </S_IconWrapper>
    );
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
};

export default Recommend;
