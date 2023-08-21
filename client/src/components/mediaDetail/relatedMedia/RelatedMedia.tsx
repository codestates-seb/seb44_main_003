import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ItemCard from '@/components/@common/Itemcard/ItemCard';
import { RelatedMediaLoading } from '@/components/mediaDetail/relatedMedia/RelatedMediaLoading';
import useRelatedMediaData from '@/queries/relatedMedia/useRelatedMediaData';
import { ContentData } from '@/types/types';

const RelatedMedia = ({ contentId }: { contentId: string }) => {
  const navigate = useNavigate();
  const { detailDataResult, filteredDataResult } =
    useRelatedMediaData(contentId);

  const getRandomItems = (items: ContentData[], numItems: number) => {
    const shuffledItems = items.sort(() => 0.5 - Math.random());
    return shuffledItems.slice(0, numItems);
  };

  if (detailDataResult.isLoading || filteredDataResult.isLoading) {
    return (
      <S_Wrapper>
        <S_Text>이런 컨텐츠는 어떠세요?</S_Text>
        <RelatedMediaLoading />
      </S_Wrapper>
    );
  }

  if (detailDataResult.isError || filteredDataResult.isError) {
    navigate('/error');
    return null;
  }

  if (detailDataResult.isSuccess && filteredDataResult.isSuccess) {
    const randomItems = getRandomItems(filteredDataResult.data?.content, 6);

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

export default RelatedMedia;

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

  @media only screen and (max-width: 770px) {
    gap: 10px;
  }
`;

const S_Item = styled.div`
  width: calc(100% / 6 - 18px);
  margin: 0px 0px 50px;

  @media only screen and (max-width: 770px) {
    width: calc(100% / 3 - 10px);
    margin: 0px 0px 30px;
  }
`;
