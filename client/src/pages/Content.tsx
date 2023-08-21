import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CommentSection from '@/components/mediaDetail/comments/CommentSection';
import ContentDetail from '@/components/mediaDetail/MediaDetail';
import RecommendContent from '@/components/mediaDetail/relatedMedia/RelatedMedia';

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
