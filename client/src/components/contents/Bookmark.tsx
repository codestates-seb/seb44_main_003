import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';
import styled from 'styled-components';
import { GetIsBookmark, PostBookmark } from '../../api/api';

const Bookmark = ({ contentId }: { contentId: string }) => {
  const queryClient = useQueryClient();

  const { isLoading, data, error, isSuccess } = useQuery(
    ['isBookmarked', contentId],
    () => GetIsBookmark(contentId),
    {
      staleTime: 5 * 60 * 1000,
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
    }
  );

  const BookmarkMutation = useMutation({
    mutationFn: (contentId: string) => PostBookmark(contentId),
    onSuccess(data) {
      if (data.status === 200) {
        queryClient.invalidateQueries(['isBookmarked', contentId]);
      }
    },
    onError(error) {
      console.error('로그인 안한 상태', error);
    },
  });

  if (isLoading) {
    return (
      <S_IconFont>
        <div>
          <AiOutlineHeart color="white" size="40" />
          <p>찜</p>
        </div>
      </S_IconFont>
    );
  }

  if (error) {
    return (
      <S_IconFont>
        <div>
          <AiOutlineHeart
            color="white"
            size="40"
            onClick={() => alert('로그인 후 이용 가능합니다')}
          />
          <p>찜</p>
        </div>
      </S_IconFont>
    );
  }

  if (isSuccess) {
    return (
      <S_IconFont>
        <div>
          {data ? (
            <S_IconFill
              color="white"
              size="40"
              onClick={() => BookmarkMutation.mutate(contentId)}
            />
          ) : (
            <S_IconEmpty
              color="white"
              size="40"
              onClick={() => BookmarkMutation.mutate(contentId)}
            />
          )}
          <p className={data ? 'marked' : ''}>찜</p>
        </div>
      </S_IconFont>
    );
  }
};

export default Bookmark;

const S_IconFont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--color-white-100);
  font-weight: bold;
  margin: 12px 24px;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  p {
    opacity: 0.8;
    margin-top: 6px;
  }
  .marked {
    opacity: 1;
  }
  svg {
    transition: transform 0.3s ease-out;
  }
  svg:hover {
    transform: scale(1.1);
  }
  svg:not(:hover) {
    transform: scale(1);
  }
`;

const S_IconFill = styled(AiFillHeart)`
  opacity: 1;
  cursor: pointer;
`;

const S_IconEmpty = styled(AiOutlineHeart)`
  opacity: 0.8;
  cursor: pointer;
`;
