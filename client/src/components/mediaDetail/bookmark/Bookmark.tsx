import { AxiosError } from 'axios';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import BookmarkLoading from '@/components/mediaDetail/bookmark/BookmarkLoading';
import useBookmarkMutation from '@/queries/mediaDetail/useBookmarkMutation';
import useIsBookmarkQuery from '@/queries/mediaDetail/useIsBookmarkQuery';
import { S_IconWrapper } from '@/styles/style';
import checkLogin from '@/utils/checkLogin';
import { notifyError } from '@/utils/notify';

function Bookmark({ contentId }: { contentId: string }) {
  const isLoggedIn = checkLogin();
  const navigate = useNavigate();

  if (!isLoggedIn) {
    return (
      <S_IconWrapper>
        <div>
          <BsHeart
            color="white"
            size="35"
            onClick={() => notifyError('로그인 후 이용 가능합니다')}
          />
          <p>찜</p>
        </div>
      </S_IconWrapper>
    );
  }

  const { isLoading, data, isSuccess, error } = useIsBookmarkQuery(contentId);
  const bookmarkMutation = useBookmarkMutation(contentId, data);

  const handleBookmark = () => {
    if (!bookmarkMutation.isLoading) {
      bookmarkMutation.mutate();
    }
  };

  if (isLoading) {
    return <BookmarkLoading />;
  }

  if (error instanceof AxiosError) {
    navigate('/error');
  }

  if (isSuccess) {
    return (
      <S_IconWrapper>
        <div>
          {data ? (
            <BsHeartFill
              color="white"
              size="34"
              className="isTrue"
              onClick={handleBookmark}
            />
          ) : (
            <BsHeart color="white" size="35" onClick={handleBookmark} />
          )}
          <p className={data ? 'isTrue' : ''}>찜</p>
        </div>
      </S_IconWrapper>
    );
  }
}

export default Bookmark;
