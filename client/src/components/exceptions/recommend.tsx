import { FaRegThumbsUp } from 'react-icons/fa';
import { S_IconWrapper } from '../../styles/style';

export const RecommendLoading = ({
  countRecommend,
}: {
  countRecommend: number;
}) => (
  <S_IconWrapper>
    <div>
      <FaRegThumbsUp color="white" size="40" />
      <p>추천</p>
    </div>
    <p>{countRecommend}</p>
  </S_IconWrapper>
);

export const RecommendError = ({
  countRecommend,
}: {
  countRecommend: number;
}) => (
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
