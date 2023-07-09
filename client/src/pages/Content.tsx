import { useParams } from 'react-router-dom';
import ContentDetail from '../components/contents/ContentDetail';
import CommentSection from '../components/comments/CommentSection';
import { scrollToTop } from './../utils/useScrollToTop';

const Content = () => {
  const { id = '' } = useParams<{ id?: string }>();
  scrollToTop();
  return (
    <>
      <ContentDetail contentId={id} />
      <CommentSection />
    </>
  );
};

export default Content;
