import { useQuery } from '@tanstack/react-query';
import { GetUserContents } from '../../../api/api';
import ItemCard from '../../ui/ItemCard';
import { styled } from 'styled-components';
import noContent from '../../../assets/exception/nocontents.webp';

function ContentsList({ path }: { path: string }) {
  const { data, isSuccess, isStale, refetch } = useQuery({
    queryKey: ['userContents', path],
    queryFn: () => GetUserContents(path),
  });
  if (isStale) refetch();
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
          <ItemCard key={item.id} item={item} />
        ))}
      </S_Wrapper>
    );
  }
}

export default ContentsList;

const S_Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1500px;
  padding: 0 10px;
  @media only screen and (max-width: 480px) {
    justify-content: center;
  }
  > div {
    width: 213px;
    margin: 20px 10px;
    @media only screen and (max-width: 480px) {
      width: 150px;
    }
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
