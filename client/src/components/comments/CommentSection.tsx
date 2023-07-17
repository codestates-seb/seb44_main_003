import { styled } from 'styled-components';
import CommentForm from './CommentForm';
import Comments from './Comments';

function CommentSection() {
  return (
    <S_Wrapper>
      <CommentForm />
      <Comments />
    </S_Wrapper>
  );
}

export default CommentSection;

const S_Wrapper = styled.section`
  margin: 50px 0;
  padding: 0 30px;
  min-width: 400px;
`;
