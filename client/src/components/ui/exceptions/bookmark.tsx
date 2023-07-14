import { AiOutlineHeart } from 'react-icons/ai';
import { S_IconWrapper } from '../../../styles/style';

export const BookmarkLoading = () => (
  <S_IconWrapper>
    <div>
      <AiOutlineHeart color="white" size="40" />
      <p>찜</p>
    </div>
  </S_IconWrapper>
);

export const BookmarkError = () => (
  <S_IconWrapper>
    <div>
      <AiOutlineHeart
        color="white"
        size="40"
        onClick={() => alert('네트워크 에러')}
      />
      <p>찜</p>
    </div>
  </S_IconWrapper>
);
