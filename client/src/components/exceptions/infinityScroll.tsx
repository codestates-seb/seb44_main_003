import styled from 'styled-components';
import SkeletonItemCard from '../ui/SkeletonItemCard';

export const InfinityScrollLoading = () => (
  <S_LoadingWrap>
    {Array.from({ length: 24 }, (_, index) => (
      <S_Item key={index}>
        <SkeletonItemCard />
      </S_Item>
    ))}
  </S_LoadingWrap>
);

const S_Item = styled.div`
  width: 225px;
  margin: 0 7.5px 50px;
`;

const S_LoadingWrap = styled.div`
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-right: 0.5vw;

  .target {
    height: 10px;
  }
`;
