import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { GetIsBookmark, PostBookmark } from '../../api/api';
import useIsLoggedIn from './../../hooks/useIsLoggedIn';
import { S_IconWrapper } from '../../styles/style';
import { BookmarkLoading, BookmarkError } from '../ui/exceptions/bookmark';

function Bookmark({ contentId }: { contentId: string }) {
  const queryClient = useQueryClient();
  const isLoggedIn = useIsLoggedIn();

  if (!isLoggedIn) {
    return (
      <S_IconWrapper>
        <div>
          <AiOutlineHeart
            color="white"
            size="40"
            onClick={() => alert('로그인 후 이용 가능합니다')}
          />
          <p>찜</p>
        </div>
      </S_IconWrapper>
    );
  }

  const { isLoading, data, error, isSuccess } = useQuery(
    ['isBookmarked', contentId],
    () => GetIsBookmark(contentId),
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
      enabled: isLoggedIn,
    }
  );

  const BookmarkMutation = useMutation({
    mutationFn: (contentId: string) => PostBookmark(contentId),
    onSuccess: () => {
      queryClient.invalidateQueries(['isBookmarked', contentId]);
    },
    onError(error) {
      console.error('로그인 안한 상태', error);
    },
  });

  if (isLoading) {
    return <BookmarkLoading />;
  }

  if (error) {
    return <BookmarkError />;
  }

  if (isSuccess) {
    return (
      <S_IconWrapper>
        <div>
          {data ? (
            <AiFillHeart
              color="white"
              size="40"
              className="isTrue"
              onClick={() => BookmarkMutation.mutate(contentId)}
            />
          ) : (
            <AiOutlineHeart
              color="white"
              size="40"
              onClick={() => BookmarkMutation.mutate(contentId)}
            />
          )}
          <p className={data ? 'isTrue' : ''}>찜</p>
        </div>
      </S_IconWrapper>
    );
  }
}

export default Bookmark;
