import CommentForm from './CommentForm';
import Comments from './Comments';
import { useQuery } from '@tanstack/react-query';

function CommentSection() {
  const comments = useQuery(['comments']);
  console.log(comments);
  return (
    <div>
      <CommentForm />
      <Comments />
    </div>
  );
}

export default CommentSection;
