import CommentForm from './CommentForm';
import Comments from './Comments';

function CommentSection({ mediaId }: { mediaId: string }) {
  return (
    <>
      <CommentForm mediaId={mediaId} />
      <Comments />
    </>
  );
}

export default CommentSection;
