import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CommentSection from '@/components/comments/CommentSection';
import ContentDetail from '@/components/detail/ContentDetail';
import RecommendContent from '@/components/detail/RecommendContent';

function Content() {
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

  return (
    <>
      <ContentDetail contentId={id} />
      <CommentSection />
      <RecommendContent contentId={id} />
    </>
  );
}

export default Content;
