import { useQuery } from '@tanstack/react-query';
import { GetComments } from '../../api/api';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { CommentsPerPage } from '../../constant/constantValue';
import { useState } from 'react';

function Comments() {
  const [page, setPage] = useState(0);
  const { id } = useParams() as { id: string };
  const {
    isLoading,
    data,
    isError,
    error,
    isSuccess,
    isFetching,
    isPreviousData,
  } = useQuery({
    queryKey: ['content', page],
    queryFn: () => GetComments({ id, page, size: CommentsPerPage }),
    staleTime: 5000,
    keepPreviousData: true,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
  });
  if (isSuccess) {
    return (
      <div>
        <div>후기 {data.length}</div>
        {data.map((review) => (
          <S_Wrapper>
            <div>
              <img src={review.member.avatarUri} alt="member profile" />{' '}
            </div>
            <div>
              <div>{review.member.nickname}</div>
              <p>{review.content}</p>
              <div>{review.createdAt}</div>
            </div>
            <button
              onClick={() => setPage((old) => Math.max(old - 1, 0))}
              disabled={page === 0}
            >
              Previous Page
            </button>
            <button
              onClick={() => {
                if (!isPreviousData && data.hasMore) {
                  setPage((old) => old + 1);
                }
              }}
              // Disable the Next Page button until we know a next page is available
              disabled={isPreviousData || !data?.hasMore}
            >
              Next Page
            </button>
          </S_Wrapper>
        ))}
      </div>
    );
  }
}

export default Comments;

const S_Wrapper = styled.div`
  display: flex;
  color: white;
  border-bottom: 1px solid white;
  & img {
    width: 26px;
    height: 26px;
  }
`;
