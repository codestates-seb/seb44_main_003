import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { styled } from 'styled-components';
import { GetUserReviews } from '@/api/api';
import Comments from '@/components/comments/Comments';

function ReviewList() {
  const [page, setPage] = useState(1);
  const { data, isSuccess } = useQuery({
    queryKey: ['comments', page],
    queryFn: () => GetUserReviews(page),
    refetchOnWindowFocus: false,
  });

  if (isSuccess) {
    if (!data.reviews.length)
      return (
        <S_Error>
          <img
            src={`${import.meta.env.VITE_IMAGE_URL}/exception/nocontents.svg`}
            alt="컨텐츠없음"
          />
          <p>작성한 후기가 없습니다</p>
        </S_Error>
      );
    return (
      <S_Wrapper>
        <Comments data={data} page={page} setPage={setPage} />
      </S_Wrapper>
    );
  }
}

export default ReviewList;

const S_Error = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px 0;
  > p {
    margin-top: 20px;
  }
`;

const S_Wrapper = styled.div`
  width: 100%;
  margin: 20px 0;
`;
