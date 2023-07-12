import { useParams } from 'react-router-dom';
import ContentDetail from '../components/contents/ContentDetail';
import CommentSection from '../components/comments/CommentSection';
import RecommendContent from '../components/contents/RecommendContent';
import { scrollToTop } from '../utils/scrollToTop';

const Content = () => {
  const { id = '' } = useParams<{ id?: string }>();
  scrollToTop();

  return (
    <>
      <ContentDetail contentId={id} />
      <CommentSection />
      <RecommendContent contentId={id}/>
    </>
  );
};

export default Content;
