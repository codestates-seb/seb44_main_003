import { BsHandThumbsUp } from 'react-icons/bs';
import { S_IconWrapper } from '../../../styles/style';

export function RecommendLoading({
  countRecommend,
}: {
  countRecommend: number;
}) {
  return (
    <S_IconWrapper>
      <div>
        <BsHandThumbsUp color="white" size="40" />
        <p>추천</p>
      </div>
      <p>{countRecommend}</p>
    </S_IconWrapper>
  );
}

export const RecommendError = ({
  countRecommend,
}: {
  countRecommend: number;
}) => (
  <S_IconWrapper>
    <div>
      <BsHandThumbsUp
        color="white"
        size="40"
        onClick={() => alert('네트워크 에러')}
      />
      <p>추천</p>
    </div>
    <p>{countRecommend}</p>
  </S_IconWrapper>
);
