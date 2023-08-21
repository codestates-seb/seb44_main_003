import { AxiosError } from 'axios';
import { BsHandThumbsUp, BsHandThumbsUpFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import RecommendLoading from '@/components/mediaDetail/recommend/RecommendLoading';
import useIsRecommendQuery from '@/queries/mediaDetail/useIsRecommendQuery';
import useRecommendMutation from '@/queries/mediaDetail/useRecommendMutation';
import { S_IconWrapper } from '@/styles/style';
import checkLogin from '@/utils/checkLogin';
import { notifyError } from '@/utils/notify';

function Recommend({
  countRecommend,
  contentId,
}: {
  countRecommend: number;
  contentId: string;
}) {
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

  const { isLoading, data, isSuccess, error } = useIsRecommendQuery(contentId);

  const recommendMutation = useRecommendMutation(contentId, data);

  const handleRecommend = () => {
    if (!recommendMutation.isLoading) {
      recommendMutation.mutate();
    }
  };

  if (isLoading) {
    return <RecommendLoading countRecommend={countRecommend} />;
  }

  if (error instanceof AxiosError) {
    navigate('/error');
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
