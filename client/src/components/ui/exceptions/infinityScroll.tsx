import { useState, useEffect } from 'react';
import styled from 'styled-components';
import SkeletonItemCard from '../SkeletonItemCard';
import { ItemProps } from '../../../types/types';

export function InfinityScrollLoading() {
  const [size, setSize] = useState(getSize());

  function getSize() {
    const width = window.innerWidth;

    if (width <= 480) {
      return 12;
    } else if (width <= 770) {
      return 16;
    } else if (width <= 1024) {
      return 20;
    } else {
      return 24;
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setSize(getSize());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <S_LoadingWrap>
      {Array.from({ length: size }, (_, index) => (
        <S_Item key={index} index={index + 1} size={size}>
          <SkeletonItemCard />
        </S_Item>
      ))}
    </S_LoadingWrap>
  );
}

const S_LoadingWrap = styled.div`
  width: calc(100vw - 40px);
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  .target {
    height: 10px;
  }

  @media only screen and (max-width: 1500px) {
    padding: 0;
  }
`;

const S_Item = styled.div<ItemProps>`
  width: 225px;
  margin: 0 0 50px 15px;
  flex-grow: 1;

  @media only screen and (max-width: 1500px) {
    width: 14vw;
    margin: ${({ index }) =>
      index % 6 === 0 ? '0 0 50px 0' : '0 15px 50px 0'};
  }

  @media only screen and (max-width: 1024px) {
    width: 17vw;
    margin: ${({ index }) =>
      index % 5 === 0 ? '0 0 30px 0' : '0 15px 30px 0'};
  }

  @media only screen and (max-width: 770px) {
    width: 18vw;
    margin: ${({ index }) =>
      index % 4 === 0 ? '0 0 30px 0' : '0 10px 30px 0'};
  }

  @media only screen and (max-width: 480px) {
    width: 23vw;
    margin: ${({ index }) =>
      index % 3 === 0 ? '0 0 30px 0' : '0 10px 30px 0'};
  }
`;
