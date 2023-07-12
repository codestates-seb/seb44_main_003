import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ContentDetail from '../components/contents/ContentDetail';
import CommentSection from '../components/comments/CommentSection';
import RecommendContent from '../components/contents/RecommendContent';

const Content = () => {
  const { id = '' } = useParams<{ id?: string }>();

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };

    scrollToTop();
  }, [id]);

  const genre: string = '판타지';

  return (
    <>
      <ContentDetail contentId={id} />
      <CommentSection />
      <RecommendContent genre={genre} />
    </>
  );
};

export default Content;
