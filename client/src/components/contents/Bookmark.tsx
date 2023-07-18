import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { GetIsBookmark, PostBookmark } from '../../api/api';
import useIsLoggedIn from './../../hooks/useIsLoggedIn';
import { S_IconWrapper } from '../../styles/style';
import BookmarkLoading from '../ui/exceptions/BookmarkLoading';

function Bookmark({ contentId }: { contentId: string }) {
  const queryClient = useQueryClient();
  const isLoggedIn = useIsLoggedIn();

  if (!isLoggedIn) {
    return (
      <S_IconWrapper>
        <div>
          <BsHeart
            color="white"
            size="35"
            onClick={() => alert('로그인 후 이용 가능합니다')}
          />
          <p>찜</p>
        </div>
      </S_IconWrapper>
    );
  }

  const { isLoading, data, isSuccess } = useQuery(
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
  });

  if (isLoading) {
    return <BookmarkLoading />;
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
              onClick={() => BookmarkMutation.mutate(contentId)}
            />
          ) : (
            <BsHeart
              color="white"
              size="35"
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
