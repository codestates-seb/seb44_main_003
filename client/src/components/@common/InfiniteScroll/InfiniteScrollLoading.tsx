import { useState, useEffect } from 'react';
import styled from 'styled-components';
import SkeletonItemCard from '@/components/@common/Itemcard/SkeletonItemCard';
import { ItemProps } from '@/types/types';
import { getResponsiveSize } from '@/utils/getResponsiveSize';

export function InfiniteScrollLoading({ path }: { path: string }) {
  const [size, setSize] = useState(getResponsiveSize());

  useEffect(() => {
    const handleResize = () => {
      setSize(getResponsiveSize());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {path.includes('/search') ? <S_Padding /> : ''}
      <S_LoadingWrap>
        {Array.from({ length: size }, (_, index) => (
          <S_Item key={index} index={index + 1} size={size}>
            <SkeletonItemCard />
          </S_Item>
        ))}
      </S_LoadingWrap>
    </>
  );
}

const S_LoadingWrap = styled.div`
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  .S_LoadingWrap.padding {
    padding-top: 230px;
  }

  .target {
    height: 10px;
  }

  @media only screen and (max-width: 1500px) {
    padding: 0;
  }
`;

const S_Item = styled.div<ItemProps>`
  width: calc((100% - 75px) / ${({ size }) => size / 4});
  margin: ${({ index }) => (index % 6 === 0 ? '0 0 30px 0' : '0 15px 30px 0')};

  @media only screen and (max-width: 1024px) {
    width: calc((100% - 60px) / ${({ size }) => size / 4});
    margin: ${({ index }) =>
      index % 5 === 0 ? '0 0 30px 0' : '0 15px 30px 0'};
  }

  @media only screen and (max-width: 770px) {
    width: calc((100% - 30px) / ${({ size }) => size / 4});
    margin: ${({ index }) =>
      index % 4 === 0 ? '0 0 30px 0' : '0 10px 30px 0'};
  }

  @media only screen and (max-width: 480px) {
    width: calc((100% - 20px) / ${({ size }) => size / 4});
    margin: ${({ index }) =>
      index % 3 === 0 ? '0 0 30px 0' : '0 10px 30px 0'};
  }
`;

const S_Padding = styled.div`
  padding-top: 230px;
`;
