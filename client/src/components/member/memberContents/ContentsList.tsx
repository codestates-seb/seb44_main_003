import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { GetUserContents } from '../../../api/api';

function ContentsList() {
  const [searchParam] = useSearchParams();
  const content = searchParam.get('content');
  const { data } = useQuery({
    queryKey: ['userLikes', content],
    queryFn: GetUserContents(content || ''),
  });
  console.log(data);
  return <div>컨텐츠 리스트!</div>;
}

export default ContentsList;
