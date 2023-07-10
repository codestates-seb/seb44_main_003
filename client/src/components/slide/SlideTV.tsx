import { useState } from 'react';
import { useQuery } from '@tanstack/react-query'
import { GetTVData } from '../../api/api';
import ItemCard from '../ui/ItemCard';
import SkeletonItemCard from '../ui/SkeletonItemCard';
import styled from 'styled-components';
import SwiperCore, { Virtual, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

// install Virtual module
SwiperCore.use([Virtual, Navigation]);

const SlideTV = ({genre}: {genre: string}) => {
  const [, setSwiperRef] = useState<SwiperCore | null>(null);

  const { isLoading, error, data, isSuccess } = useQuery({
    queryKey: ['tvData', genre],
    queryFn: () => GetTVData(genre),
  })

  if (isLoading) {
    return (
      <S_Wrapper>
        <S_SkeletonBox>
        {Array.from({ length: 6 }, (_, index) => (
          <SkeletonItemCard  key={index}/>
        ))}
        </S_SkeletonBox>
      </S_Wrapper>
    );
  }

  if (error instanceof Error) return 'An error has occurred: ' + error.message

  if (isSuccess) {
    return (
      <S_Wrapper>
        <S_Swiper
          onSwiper={setSwiperRef}
          slidesPerView={6} // 한 슬라이드에 보여줄 갯수
          slidesPerGroup={5} // 한 번에 넘어가는 슬라이드 그룹의 개수
          centeredSlides={false} // 센터 모드
          spaceBetween={18} // 슬라이드 사이 여백
          navigation={true} // 버튼
          watchOverflow={true}
          virtual
        > 
          {data.map((item) => (
          <S_SwiperSlide>
            <ItemCard item={item} />
          </S_SwiperSlide>
          ))}
        </S_Swiper>
      </S_Wrapper>
    );
  };
};

export default SlideTV;

const S_Wrapper = styled.div`
  position: relative;
  overflow-x: hidden; // 가로 스크롤 숨김
  margin: 0;
  padding: 0px 3.75rem;
  width: 100%;
`;

const S_Swiper = styled(Swiper)`
  display: flex;
  overflow: visible; // 요소의 내용이 요소의 크기를 넘어갈 경우에도 내용을 표시
  margin-top: 1.25rem;
  margin-bottom: 3.75rem;

  .swiper-button-prev,
  .swiper-button-next {
    top: 50%;
    margin: 0;
    padding: 1.5rem;
    height: 100%;
    transform: translateY(-50%);
    background-repeat: no-repeat;
    background: var(--color-bg-60);
    color: var(--color-white-100);
    text-shadow: 4px 4px 10px rgba(0, 0, 0, 0.4);
    z-index: 10;
    --swiper-navigation-size: 2.5rem;
    opacity: 0;
  }
  .swiper-button-prev {
    left: -3.75rem;
  }
  .swiper-button-next {
    right: -3.75rem;
  }

  &:hover {
    .swiper-button-prev,
    .swiper-button-next {
      opacity: 1;
      transition: opacity 0.3s ease;
    }
  } 
`

const S_SwiperSlide = styled(SwiperSlide)`
  display: flex;
  cursor: pointer;
`;

const S_SkeletonBox = styled.div`
  display: flex;
  gap: 18px;
  margin-bottom: 3.75rem;
`;