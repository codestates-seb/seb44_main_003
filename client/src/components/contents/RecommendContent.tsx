import { useQuery } from '@tanstack/react-query';
import { GetTVData } from '../../api/api';
import styled from 'styled-components';
import ItemCard from '../ui/ItemCard';
import SkeletonItemCard from '../ui/SkeletonItemCard';
import { ContentData } from '../../types/types';

const RecommendContent = ({ genre }: { genre: string }) => {

  const { isLoading, error, data, isSuccess } = useQuery({
    queryKey: ['tvData', genre],
    queryFn: () => GetTVData(genre),
  });

  if (isLoading) {
    return (
      <>
        <S_Text>
        이런 컨텐츠는 어떠세요?
        </S_Text>
        <S_Wrapper>
          <S_SkeletonBox>
          {Array.from({ length: 6 }, (_, index) => (
            <S_Item key={index}>
              <SkeletonItemCard />
            </S_Item>
          ))}
          </S_SkeletonBox>
        </S_Wrapper>
      </>
    );
  }

  if (error instanceof Error) return 'An error has occurred: ' + error.message;

  if (isSuccess) {
    const itemsToShow = data.content.slice(0, 6);

    return (
      <>
        <S_Text>
        이런 컨텐츠는 어떠세요?
        </S_Text>
        <S_Wrapper>
          {itemsToShow.map((item: ContentData) => (
            <S_Item>
              <ItemCard item={item} />
            </S_Item>
          ))}
        </S_Wrapper>
      </>
    );
  }
};

export default RecommendContent;

const S_Wrapper = styled.div`
  display: flex;
  /* flex-wrap: wrap; */
  width: 100vw;
  /* justify-content: space-between; */
  padding: 0px 30px;
`;

const S_Text = styled.p`
  margin: 28px 0 10px 0;
  padding: 0px 30px;
  color: var(--color-white-100);
  font-size: 24px;
  font-weight: 700;
`;

const S_Item = styled.div`
  width: 225px;
  margin: 0 7.5px 50px;
`;

const S_SkeletonBox = styled.div`
  display: flex;
  /* gap: 18px; */
  margin-bottom: 3.75rem;
`;
