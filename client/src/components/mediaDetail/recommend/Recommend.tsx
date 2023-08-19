import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { BsHandThumbsUp, BsHandThumbsUpFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { GetIsRecommend, PostRecommend } from '@/api/api';
import RecommendLoading from '@/components/mediaDetail/recommend/RecommendLoading';
import { S_IconWrapper } from '@/styles/style';
import checkLogin from '@/utils/checkLogin';
import { notifyError, notifyWithIcon } from '@/utils/notify';

function Recommend({
  countRecommend,
  contentId,
}: {
  countRecommend: number;
  contentId: string;
}) {
  const queryClient = useQueryClient();
  const isLoggedIn = checkLogin();
  const navigate = useNavigate();

  if (!isLoggedIn) {
    return (
      <S_IconWrapper>
        <div>
          <BsHandThumbsUp
            color="white"
            size="35"
            onClick={() => notifyError('로그인 후 이용 가능합니다')}
          />
          <p>추천</p>
        </div>
        <p>{countRecommend}</p>
      </S_IconWrapper>
    );
  }

  const { isLoading, data, isSuccess, error } = useQuery(
    ['isRecommend', contentId],
    () => GetIsRecommend(contentId),
    {
      enabled: isLoggedIn,
    }
  );

  const RecommendMutation = useMutation({
    mutationFn: (contentId: string) => PostRecommend(contentId),
    onSuccess: () => {
      if (!data) {
        notifyWithIcon('추천 완료!', '👍🏼');
      } else {
        notifyWithIcon('추천 취소..', '👎🏼');
      }
      queryClient.invalidateQueries(['isRecommend', contentId]);
      queryClient.invalidateQueries(['selectedContent', contentId]);
      queryClient.invalidateQueries(['userContents']);
    },
  });

  const handleRecommend = () => {
    if (!RecommendMutation.isLoading) {
      RecommendMutation.mutate(contentId);
    }
  };

  if (isLoading) {
    return <RecommendLoading countRecommend={countRecommend} />;
  }

  if (error instanceof AxiosError) {
    if (!error.status && error.code === 'ERR_NETWORK') navigate('/error');
  }

  if (isSuccess) {
    return (
      <S_IconWrapper>
        <div>
          {data ? (
            <BsHandThumbsUpFill
              color="white"
              size="35"
              className="isTrue"
              onClick={handleRecommend}
            />
          ) : (
            <BsHandThumbsUp color="white" size="35" onClick={handleRecommend} />
          )}
          <p>추천</p>
        </div>
        <p className={data ? 'isTrue' : ''}>{countRecommend}</p>
      </S_IconWrapper>
    );
  }
}

export default Recommend;
