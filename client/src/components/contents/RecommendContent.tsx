import { useQuery } from '@tanstack/react-query';
import { GetDataDetail, GetFilterdData } from '../../api/api';
import styled from 'styled-components';
import ItemCard from '../ui/ItemCard';
import { RecommendContentLoading } from '../ui/exceptions/recommendContent';
import { ContentData } from '../../types/types';

const RecommendContent = ({ contentId }: { contentId: string }) => {
  const { isLoading: detailLoading, error: detailError, data: detailData, isSuccess: detailSuccess } = useQuery({
    queryKey: ['selectedContent', contentId],
    queryFn: () => GetDataDetail(contentId),
  });

  let category = detailData?.category === 'TV' ? 'tv' : 'movie';

  const { isLoading: filteredLoading, error: filteredError, data: filteredData, isSuccess: filteredSuccess } = useQuery({
    queryKey: ['filteredContent', contentId],
    queryFn: () => GetFilterdData(
      `/medias/${category}?size=6&genre=${detailData?.genre.join(',')}`
    ),
    enabled: !!detailData // true가 되면 filteredData를 실행한다
  });

  if (detailLoading || filteredLoading) {
    return (
      <S_Wrapper>
        <S_Text>이런 컨텐츠는 어떠세요?</S_Text>
        <RecommendContentLoading />
      </S_Wrapper>
    );
  }

  if (detailError instanceof Error) return 'An error has occurred: ' + detailError.message;

  if (filteredError instanceof Error) return 'An error has occurred: ' + filteredError.message;
  
  if (detailSuccess && filteredSuccess) {
    return (
      <S_Wrapper>
        <S_Text>이런 컨텐츠는 어떠세요?</S_Text>
        <S_ItemBox>
          {filteredData?.content.map((item: ContentData) => (
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
  padding: 0px 30px;
`;

const S_Text = styled.p`
  margin: 28px 0 20px 0;
  color: var(--color-white-100);
  font-size: 24px;
  font-weight: 700;
`;

const S_ItemBox = styled.div`
  display: flex;
  width: 100vw;
  flex-wrap: wrap;
`;

const S_Item = styled.div`
  width: calc(100% / 6 - 15px);
  margin: 0px 7.5px 50px;

  @media only screen and (max-width: 1200px) {
    width: calc(100% / 6 - 15px);
    gap: 18px;
  }

  @media only screen and (max-width: 1024px) {
    width: calc(100% / 5 - 15px);
    gap: 16px;
  }
  
  @media only screen and (max-width: 770px) {
    width: calc(100% / 4 - 15px);
    gap: 14px;
  }

  @media only screen and (max-width: 480px) {
    width: calc(100% / 3 - 15px);
    gap: 10px;
  }
`;