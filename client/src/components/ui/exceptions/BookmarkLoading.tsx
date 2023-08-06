import { BsHeart } from 'react-icons/bs';
import { S_IconWrapper } from '@/styles/style';

function BookmarkLoading() {
  return (
    <S_IconWrapper>
      <div>
        <BsHeart color="white" size="40" />
        <p>찜</p>
      </div>
    </S_IconWrapper>
  );
}

export default BookmarkLoading;
