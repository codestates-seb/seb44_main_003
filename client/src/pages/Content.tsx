import { useParams } from 'react-router-dom';
import ContentDetail from '../components/contents/ContentDetail';
import CommentSection from '../components/comments/CommentSection';

const Content = () => {
  const { id = '' } = useParams<{ id?: string }>();
  return (
    <>
      <ContentDetail contentId={id} />
      <CommentSection />
    </>
  );
};

export default Content;
