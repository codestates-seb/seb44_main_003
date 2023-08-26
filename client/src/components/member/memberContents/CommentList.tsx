import { useState } from 'react';
import { styled } from 'styled-components';
import Comments from '@/components/mediaDetail/comments/Comments';
import useMemberComments from '@/queries/member/useMemberComments';

function CommentList() {
  const [page, setPage] = useState(1);
  const { data, isSuccess } = useMemberComments(page);

  if (isSuccess) {
    if (!data!.reviews.length)
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
        <Comments data={data!} page={page} setPage={setPage} />
      </S_Wrapper>
    );
  }
}

export default CommentList;

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
