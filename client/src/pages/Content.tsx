import { useParams } from 'react-router-dom';
import ContentDetail from '../components/contents/ContentDetail';

const Content = () => {
  const { id = '' } = useParams<{ id?: string }>();
  return (
    <>
      <ContentDetail contentId={id} />
    </>
  );
};

export default Content;
