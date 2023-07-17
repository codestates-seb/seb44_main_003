import { styled } from 'styled-components';
import CommentForm from './CommentForm';
import Comments from './Comments';
import { useQuery } from '@tanstack/react-query';
import { GetComments } from '../../api/api';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

function CommentSection() {
  const [page, setPage] = useState(1);
  const { id } = useParams() as { id: string };
  const { data, isSuccess, isLoading, isFetching } = useQuery({
    queryKey: ['comments', id, page],
    queryFn: () => GetComments({ id, page }),
    refetchOnWindowFocus: false,
  });

  if (isSuccess) {
    return (
      <S_Wrapper>
        <CommentForm />
        {isLoading || (isFetching && <div className="loading-box" />)}
        <Comments data={data} page={page} setPage={setPage} />
      </S_Wrapper>
    );
  }
}

export default CommentSection;

const S_Wrapper = styled.section`
  margin: 50px 0;
  padding: 0 30px;
  min-width: 400px;
  min-height: 300px;
  & div.loading-box {
    min-height: 800px;
  }
`;
