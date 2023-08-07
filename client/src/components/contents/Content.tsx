import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CommentSection from '@/components/contents/comments/CommentSection';
import ContentDetail from '@/components/contents/contentDetail/ContentDetail';
import RecommendContent from '@/components/contents/recommendContent/RecommendContent';

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
