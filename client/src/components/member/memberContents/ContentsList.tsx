import { useQuery } from '@tanstack/react-query';
import { styled } from 'styled-components';
import { GetMemberContents } from '@/api/api';
import ItemCard from '@/components/@common/Itemcard/ItemCard';

function ContentsList({ path }: { path: string }) {
  const { data, isSuccess, isStale, refetch } = useQuery({
    queryKey: ['userContents', path],
    queryFn: () => GetMemberContents(path),
  });
  if (isStale) refetch();
  if (isSuccess) {
    if (!data.length)
      return (
        <S_Error>
          <img
            src={`${import.meta.env.VITE_IMAGE_URL}/exception/nocontents.svg`}
            alt="컨텐츠없음"
          />
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
  > div {
    width: 213px;
    margin: 20px 5px;
    @media only screen and (max-width: 600px) {
      width: calc(100% / 3 - 10px);
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
