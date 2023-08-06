import { useState, useEffect } from 'react';
import styled from 'styled-components';
import SkeletonItemCard from '@/components/@common/Itemcard/SkeletonItemCard';

export function RelatedMediaLoading() {
  const [skeletonSize, setSkeletonSize] = useState(getSkeletonSize());

  function getSkeletonSize() {
    const width = window.innerWidth;

    if (width < 770) {
      return { size: 3, gap: 10 };
    } else {
      return { size: 6, gap: 18 };
    }
  }

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
}

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
