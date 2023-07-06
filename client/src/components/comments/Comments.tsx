import { useQuery } from '@tanstack/react-query';
import { GetComments } from '../../api/api';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { CommentsPerPage } from '../../constant/constantValue';
import { useState } from 'react';

function Comments() {
  const [page, setPage] = useState(0);
  const { id } = useParams() as { id: string };
  const { isLoading, data, error, isSuccess } = useQuery({
    queryKey: ['content'],
    queryFn: () => GetComments({ id, page, size: CommentsPerPage }),
    staleTime: 5 * 60 * 1000,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
  });
  if (isSuccess) {
    return (
      <div>
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
