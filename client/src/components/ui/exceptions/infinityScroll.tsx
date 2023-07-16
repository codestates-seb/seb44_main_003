import styled from 'styled-components';
import SkeletonItemCard from '../SkeletonItemCard';

export function InfinityScrollLoading() {
  const count = (import.meta.env.VITE_LOADING_INFINITY_ITEMS_COUNT = 24);
  return (
    <S_LoadingWrap>
      {Array.from({ length: count }, (_, index) => (
        <S_Item key={index}>
          <SkeletonItemCard />
        </S_Item>
      ))}
    </S_LoadingWrap>
  );
}

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
