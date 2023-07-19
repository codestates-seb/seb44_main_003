import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { GetOttTopList } from '../../../api/api';
import ItemCard from '../../ui/ItemCard';
import SkeletonItemCard from '../../ui/SkeletonItemCard';
import styled from 'styled-components';
import SwiperCore, { Virtual, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { AxiosError } from 'axios';
import 'swiper/css';
import 'swiper/css/navigation';
import { useNavigate } from 'react-router-dom';

SwiperCore.use([Virtual, Navigation]);

const MainSlider = ({ ott }: { ott: string }) => {
  const [, setSwiperRef] = useState<SwiperCore | null>(null);
  const navigate = useNavigate();

  const { isLoading, error, data, isSuccess } = useQuery({
    queryKey: ['topTenData', ott],
    queryFn: () => GetOttTopList(ott),
  });

  const breakpoints = {
    0: { slidesPerView: 3, slidesPerGroup: 2, spaceBetween: 10 },
    480: { slidesPerView: 3, slidesPerGroup: 2, spaceBetween: 10 },
    770: { slidesPerView: 4, slidesPerGroup: 3, spaceBetween: 14 },
    1024: { slidesPerView: 5, slidesPerGroup: 4, spaceBetween: 16 },
    1200: { slidesPerView: 6, slidesPerGroup: 5, spaceBetween: 18 },
  };

  if (isLoading) {
    return (
      <S_Wrapper>
        <S_SkeletonBox>
          {Array.from({ length: 6 }, (_, index) => (
            <SkeletonItemCard key={index} />
          ))}
        </S_SkeletonBox>
      </S_Wrapper>
    );
  }

  if (error instanceof AxiosError) {
    if (!error.status && error.code === 'ERR_NETWORK') navigate('/error');
  }

  if (isSuccess) {
    return (
      <S_Wrapper>
        <S_Swiper
          onSwiper={setSwiperRef}
          slidesPerView={6}
          slidesPerGroup={5}
          centeredSlides={false}
          spaceBetween={18}
          navigation={true}
          watchOverflow={true}
          breakpoints={breakpoints}
          virtual
        >
          {data.content.map((item) => (
            <S_SwiperSlide>
              <ItemCard item={item} />
            </S_SwiperSlide>
          ))}
        </S_Swiper>
      </S_Wrapper>
    );
  }
};

export default MainSlider;

const S_Wrapper = styled.div`
  position: relative;
  overflow-x: hidden;
  margin: 0;
  padding: 0px 3.75rem;
  width: 100%;
`;

const S_Swiper = styled(Swiper)`
  display: flex;
  overflow: visible;
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

  .swiper-button-disabled {
    display: none;
  }

  &:hover {
    .swiper-button-prev,
    .swiper-button-next {
      opacity: 1;
      transition: opacity 0.3s ease;
    }
  }
`;

const S_SwiperSlide = styled(SwiperSlide)`
  display: flex;
  cursor: pointer;
`;

const S_SkeletonBox = styled.div`
  display: flex;
  gap: 18px;
  margin-bottom: 3.75rem;
`;
