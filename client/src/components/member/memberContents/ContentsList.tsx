import { useQuery } from '@tanstack/react-query';
import { GetUserContents } from '../../../api/api';
import ItemCard from '../../ui/ItemCard';
import { styled } from 'styled-components';

function ContentsList({ path }: { path: string }) {
  const { data, isSuccess } = useQuery({
    queryKey: ['userContents', path],
    queryFn: () => GetUserContents(path),
  });
  if (isSuccess) {
    return (
      <S_Wrapper>
        {data.map((item) => (
          <ItemCard item={item} />
        ))}
      </S_Wrapper>
    );
  }
}

export default ContentsList;

const S_Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1500px;
  > div {
    width: 216px;
    margin: 20px 10px;
  }
`;
