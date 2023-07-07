import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { DeleteComment, GetComments, PatchComment } from '../../api/api';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { useState } from 'react';

function Comments() {
  const [page, setPage] = useState(1);
  const { id } = useParams() as { id: string };
  const queryClient = useQueryClient();
  const {
    data,

    isSuccess,
  } = useQuery({
    queryKey: ['comments', page],
    queryFn: () => GetComments({ id, page }),
    staleTime: 5000,
    keepPreviousData: true,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
  });
  const PatchMutation = useMutation(PatchComment, {
    onSuccess: () => queryClient.invalidateQueries(['comments']),
  });
  const DeleteMutation = useMutation(DeleteComment, {
    onSuccess: () => queryClient.invalidateQueries(['comments']),
  });
  const handlePatch = (e: React.MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    PatchMutation.mutate({ id: target.id, content: '' });
  };

  const handleDelete = (e: React.MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    DeleteMutation.mutate(target.id);
  };

  if (isSuccess) {
    return (
      <div>
        {data.map((review) => (
          <S_Wrapper key={review.id}>
            <div>
              <img src={review.member.avatarUri} alt="member profile" />
            </div>
            <div>
              <div>{review.member.nickname}</div>
              <p>{review.content}</p>
              <div>{review.createdAt}</div>
            </div>
            <button
              type="button"
              onClick={handlePatch}
              id={review.id.toString()}
            >
              수정
            </button>
            <button
              type="button"
              onClick={handleDelete}
              id={review.id.toString()}
            >
              지우기
            </button>
          </S_Wrapper>
        ))}
        {Array.from({ length: 10 }).map((e, i) => (
          <button key={i} onClick={() => setPage(i + 1)}>
            {i + 1}
          </button>
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
