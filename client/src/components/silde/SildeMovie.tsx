import { useState } from 'react';
import { GetMovieData } from '../../api/api';
import ItemCard from '../ui/ItemCard';
import styled from 'styled-components';
import SwiperCore, { Virtual, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { useQuery } from '@tanstack/react-query'

// install Virtual module
SwiperCore.use([Virtual, Navigation]); 

const SildeMovie = () => {
  const [, setSwiperRef] = useState<SwiperCore | null>(null);

  const { isLoading, error, data, isSuccess } = useQuery({
    queryKey: ['movieData'],
    queryFn: () => GetMovieData(),
  })

  if (isLoading) return 'Loading...'

  if (error instanceof Error) return 'An error has occurred: ' + error.message

  if (isSuccess) {
    return (
      <S_Wrapper>
        <S_Swiper
          onSwiper={setSwiperRef}
          slidesPerView={6} // 한 슬라이드에 보여줄 갯수
          centeredSlides={false} // 센터 모드
          spaceBetween={18} // 슬라이드 사이 여백
          navigation={true} // 버튼
          watchOverflow={true}
          virtual
        > 
          <S_SwiperSlide>
            {data.map((item) => (
              <ItemCard item={item} />
            ))}
          </S_SwiperSlide>
        </S_Swiper>
      </S_Wrapper>
    );
  };
};

export default SildeMovie;

const S_Wrapper = styled.div`
  position: relative;
  overflow-x: hidden; // 가로 스크롤 숨김
  margin: 0;
  padding: 0px 3.75rem;
  width: 100%;
`;

// const S_Genrelist = styled.div`
//   margin-bottom: 3.75rem;
// `;

// const S_GenreTitle = styled.h2`
//   margin: 28px 0 10px 0;
//   color: var(--color-white-100);
//   font-size: 24px;
//   font-weight: 700;
// `;

const S_Swiper = styled(Swiper)`
  display: flex;
  overflow: visible; // 요소의 내용이 요소의 크기를 넘어갈 경우에도 내용을 표시
  margin: 20px auto;

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
  flex-direction: column;
  transition: transform 0.3s ease;
  filter: var(--shadow-l-40);
  cursor: pointer;
  &:hover {
    transform: translateY(-15px);
  }
`;

// const S_LoadingMessage = styled.div`
//   color: var(--color-white-80);
// `;