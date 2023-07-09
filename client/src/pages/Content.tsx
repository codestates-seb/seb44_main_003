import { useParams } from 'react-router-dom';
import ContentDetail from '../components/contents/ContentDetail';
import CommentSection from '../components/comments/CommentSection';
import useScrollToTop from './../hooks/useScrollToTop';

const Content = () => {
  const { id = '' } = useParams<{ id?: string }>();
  useScrollToTop();
  return (
    <>
      <ContentDetail contentId={id} />
      <CommentSection />
    </>
  );
};

export default Content;
