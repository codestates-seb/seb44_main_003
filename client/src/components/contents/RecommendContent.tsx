import { useQuery } from '@tanstack/react-query';
import { GetDataDetail, GetFilterdData } from '../../api/api';
import styled from 'styled-components';
import ItemCard from '../ui/ItemCard';
import SkeletonItemCard from '../ui/SkeletonItemCard';
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
      <>
        <S_Text>이런 컨텐츠는 어떠세요?</S_Text>
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

  if (detailError instanceof Error) return 'An error has occurred: ' + detailError.message;

  if (filteredError instanceof Error) return 'An error has occurred: ' + filteredError.message;
  
  if (detailSuccess && filteredSuccess) {
    return (
      <>
        <S_Text>이런 컨텐츠는 어떠세요?</S_Text>
        <S_Wrapper>
          {filteredData?.content.map((item: ContentData) => (
            <S_Item key={item.id}>
              <ItemCard item={item} />
            </S_Item>
          ))}
        </S_Wrapper>
      </>
    );
  }

  return null;
};

export default RecommendContent;

const S_Wrapper = styled.div`
  display: flex;
  width: 100vw;
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
  margin-top: 10px;
`;

const S_SkeletonBox = styled.div`
  display: flex;
  margin-bottom: 3.75rem;
`;
