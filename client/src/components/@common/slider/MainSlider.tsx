import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SwiperCore, { Virtual, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { GetOttTopList } from '@/api/api';
import ItemCard from '@/components/@common/Itemcard/ItemCard';
import SliderLoading from '@/components/@common/slider/sliderLoading';
import 'swiper/css';
import 'swiper/css/navigation';

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
      <>
        <S_LoadingBox>
          <SliderLoading />
        </S_LoadingBox>
      </>
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
            <S_SwiperSlide key={item.id}>
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

  @media only screen and (max-width: 770px) {
    padding: 0px 2rem;
  }

  @media only screen and (max-width: 480px) {
    padding: 0px 1.25rem;
  }
`;

const S_Swiper = styled(Swiper)`
  display: flex;
  overflow: visible;
  margin-top: 1.25rem;
  margin-bottom: 3.75rem;

  @media only screen and (max-width: 770px) {
    margin-top: 1rem;
    margin-bottom: 2.5rem;
  }

  @media only screen and (max-width: 480px) {
    margin-top: 0.75rem;
    margin-bottom: 1rem;
  }

  .swiper-button-prev,
  .swiper-button-next {
    top: 50%;
    margin: 0;
    padding: 1.5rem;
    height: 100%;
    transform: translateY(-55%);
    background-repeat: no-repeat;
    background: var(--color-bg-60);
    color: var(--color-white-100);
    text-shadow: 4px 4px 10px rgba(0, 0, 0, 0.4);
    z-index: 10;
    --swiper-navigation-size: 2.5rem;
    opacity: 0;

    @media only screen and (max-width: 770px) {
      padding: 1rem;
      --swiper-navigation-size: 2rem;
    }

    @media only screen and (max-width: 480px) {
      padding: 0.55rem;
      --swiper-navigation-size: 1rem;
    }
  }
  .swiper-button-prev {
    left: -3.75rem;

    @media only screen and (max-width: 770px) {
      left: -2rem;
    }

    @media only screen and (max-width: 480px) {
      left: -1.25rem;
    }
  }
  .swiper-button-next {
    right: -3.75rem;

    @media only screen and (max-width: 770px) {
      right: -2rem;
    }

    @media only screen and (max-width: 480px) {
      right: -1.25rem;
    }
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

const S_LoadingBox = styled.div`
  margin-top: 15px;
  padding: 0px 3.75rem;

  @media only screen and (max-width: 770px) {
    padding: 0px 2rem;
  }

  @media only screen and (max-width: 480px) {
    margin-top: 10px;
    padding: 0px 1.25rem;
  }
`;
