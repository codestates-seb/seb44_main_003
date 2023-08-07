import { useState, useEffect } from 'react';
import styled from 'styled-components';
import SkeletonItemCard from '@/components/@common/Itemcard/SkeletonItemCard';

const sliderLoading = () => {
  const getSkeletonSize = () => {
    const width = window.innerWidth;

    if (width < 770) {
      return { size: 3, gap: 10 };
    } else if (width < 1024) {
      return { size: 4, gap: 14 };
    } else if (width < 1200) {
      return { size: 5, gap: 16 };
    } else {
      return { size: 6, gap: 18 };
    }
  };

  const [skeletonSize, setSkeletonSize] = useState(getSkeletonSize());

  useEffect(() => {
    const handleResize = () => {
      setSkeletonSize(getSkeletonSize());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <S_Wrapper>
      <S_SkeletonBox gap={skeletonSize.gap}>
        {Array.from({ length: skeletonSize.size }, (_, index) => (
          <SkeletonItemCard key={index} />
        ))}
      </S_SkeletonBox>
    </S_Wrapper>
  );
};

export default sliderLoading;

const S_Wrapper = styled.div`
  position: relative;
  overflow-x: hidden; // 가로 스크롤 숨김
  margin: 0;
  width: 100%;
`;

const S_SkeletonBox = styled.div<{ gap: number }>`
  display: flex;
  gap: ${(props) => props.gap}px;
  margin-bottom: 3.75rem;
`;
