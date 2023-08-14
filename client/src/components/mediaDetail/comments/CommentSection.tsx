import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { GetComments } from '@/api/api';
import CommentForm from '@/components/mediaDetail/comments/CommentForm';
import Comments from '@/components/mediaDetail/comments/Comments';

function CommentSection() {
  const [page, setPage] = useState(1);
  const { id } = useParams() as { id: string };
  const { data, isSuccess, isLoading, isFetching } = useQuery({
    queryKey: ['comments', id, page],
    queryFn: () => GetComments({ id, page }),
    refetchOnWindowFocus: false,
    staleTime: 0,
    cacheTime: 0,
  });
  if (isLoading || isFetching) return <S_Loading />;
  if (isSuccess) {
    return (
      <S_Wrapper>
        <CommentForm />
        <Comments data={data} page={page} setPage={setPage} />
      </S_Wrapper>
    );
  }
}

export default CommentSection;
const S_Wrapper = styled.section`
  margin: 50px 0;
  padding: 0 60px;
  min-height: 300px;
  @media only screen and (max-width: 770px) {
    padding: 0 20px;
  }
`;
const S_Loading = styled.div`
  height: 800px;
`;
