import { useQuery } from '@tanstack/react-query';
import { GetUserContents } from '../../../api/api';
import ItemCard from '../../ui/ItemCard';
import { styled } from 'styled-components';
import noContent from '../../../assets/exception/nocontents.svg';

function ContentsList({ path }: { path: string }) {
  const { data, isSuccess } = useQuery({
    queryKey: ['userContents', path],
    queryFn: () => GetUserContents(path),
  });
  if (isSuccess) {
    if (!data.length)
      return (
        <S_Error>
          <img src={noContent} />
          <p>컨텐츠가 없습니다</p>
        </S_Error>
      );
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

const S_Error = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  > p {
    margin-top: 20px;
  }
`;
