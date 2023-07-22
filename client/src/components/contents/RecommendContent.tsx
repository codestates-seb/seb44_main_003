import { useQuery } from '@tanstack/react-query';
import { GetDataDetail, GetFilterdData } from '../../api/api';
import styled from 'styled-components';
import ItemCard from '../ui/ItemCard';
import { RecommendContentLoading } from '../ui/exceptions/RecommendContentLoading';
import { ContentData } from '../../types/types';

const RecommendContent = ({ contentId }: { contentId: string }) => {
  const getRandomItems = (items: ContentData[], numItems: number) => {
    const shuffledItems = items.sort(() => 0.5 - Math.random());
    return shuffledItems.slice(0, numItems);
  };

  const {
    isLoading: detailLoading,
    error: detailError,
    data: detailData,
    isSuccess: detailSuccess,
  } = useQuery({
    queryKey: ['selectedContent', contentId],
    queryFn: () => GetDataDetail(contentId),
  });

  let category = detailData?.category === 'TV' ? 'tv' : 'movie';

  const {
    isLoading: filteredLoading,
    error: filteredError,
    data: filteredData,
    isSuccess: filteredSuccess,
  } = useQuery({
    queryKey: ['filteredContent', contentId],
    queryFn: () =>
      GetFilterdData(
        `/medias/${category}?genre=${detailData?.genre.join(',')}`
      ),
    enabled: !!detailData, // true가 되면 filteredData를 실행한다
  });

  if (detailLoading || filteredLoading) {
    return (
      <S_Wrapper>
        <S_Text>이런 컨텐츠는 어떠세요?</S_Text>
        <RecommendContentLoading />
      </S_Wrapper>
    );
  }

  if (detailError instanceof Error)
    return 'An error has occurred: ' + detailError.message;

  if (filteredError instanceof Error)
    return 'An error has occurred: ' + filteredError.message;

  if (detailSuccess && filteredSuccess) {

    const randomItems = getRandomItems(filteredData?.content, 6);

    return (
      <S_Wrapper>
        <S_Text>이런 컨텐츠는 어떠세요?</S_Text>
        <S_ItemBox>
          {randomItems.map((item: ContentData) => (
            <S_Item key={item.id}>
              <ItemCard item={item} />
            </S_Item>
          ))}
        </S_ItemBox>
      </S_Wrapper>
    );
  }

  return null;
};

export default RecommendContent;

const S_Wrapper = styled.div`
  padding: 0px 3.75rem;

  @media only screen and (max-width: 770px) {
    padding: 0px 1.25rem;
  }
`;

const S_Text = styled.p`
  margin: 28px 0 20px 0;
  color: var(--color-white-100);
  font-size: 24px;
  font-weight: 700;

  @media only screen and (max-width: 770px) {
    font-size: 18px;
  }
`;

const S_ItemBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 18px;
  /* border: 2px solid red; */

  @media only screen and (max-width: 770px) {
    gap: 10px;
  }
`;

const S_Item = styled.div`
  width: calc(100% / 6 - 18px);
  margin: 0px 0px 50px;
  /* border: 2px solid yellow; */

  @media only screen and (max-width: 770px) {
    width: calc(100% / 3 - 10px);
    margin: 0px 0px 30px;
  }
`;