import { BsHandThumbsUp } from 'react-icons/bs';
import { S_IconWrapper } from '@/styles/style';

function RecommendLoading({ countRecommend }: { countRecommend: number }) {
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

export default RecommendLoading;
