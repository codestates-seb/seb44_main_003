import React, { useState, useEffect, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { GetTVData, GetMovieData } from '../../api/api';
import { ContentData } from '../../types/types';
import ItemCard from '../ui/ItemCard';
import SliderLoading from '../ui/exceptions/sliderLoading';
import styled from 'styled-components';
import SwiperCore, { Virtual, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

SwiperCore.use([Virtual, Navigation]);

const GenreSlide = ({ genre, path }: { genre: string, path: 'tv'|'movie' }) => {
  const [, setSwiperRef] = useState<SwiperCore | null>(null);
  const [size, setSize] = useState(getSize());
  const lastSlideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setSize(getSize());
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);



  const breakpoints = {
    0: { slidesPerView: 3, slidesPerGroup: 2, spaceBetween: 10 },
    480: { slidesPerView: 3, slidesPerGroup: 2, spaceBetween: 10 },
    770: { slidesPerView: 4, slidesPerGroup: 3, spaceBetween: 14 },
    1024: { slidesPerView: 5, slidesPerGroup: 4, spaceBetween: 16 },
    1200: { slidesPerView: 6, slidesPerGroup: 5, spaceBetween: 18 }
  };

  const { data, fetchNextPage, hasNextPage, status } = useInfiniteQuery(
    path === 'tv' ? ['tvGenreSlide', genre] : ['movieGenreSlide', genre],
    ({ pageParam = 1 }) =>
      path === 'tv'
        ? GetTVData(genre, size, pageParam)
        : GetMovieData(genre, size, pageParam),
    {
      getNextPageParam: (lastPage) => {
        const currentPage = lastPage.currentPage;
        const totalPages = lastPage.totalPages;
        if (currentPage < totalPages) {
          return currentPage + 1;
        }

        return undefined;
      },
    }
  )
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    }, options);

    if (lastSlideRef.current) {
      observer.observe(lastSlideRef.current);
    }

    return () => {
      if (lastSlideRef.current) {
        observer.unobserve(lastSlideRef.current);
      }
    };
  }, [fetchNextPage, hasNextPage]);

  function getSize() {
    const width = window.innerWidth;

    if (width <= 480) {
      return 6;
    } else if (width <= 770) {
      return 8;
    } else if (width <= 1024) {
      return 12;
    } else {
      return 14;
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

  if (status === 'loading') {
    return (
      <>
        <S_GenreTitle>{genre}</S_GenreTitle>
        <S_LoadingBox>
          <SliderLoading />
        </S_LoadingBox>
      </>
    )
  }

  if (status === 'error') return <div>Error</div>;
  
  if (status === 'success' && data.pages[0].content.length > 0) {
    return (
      <>
        <S_GenreTitle>{genre}</S_GenreTitle>
        <S_SwiperBox>
          <S_Swiper
            onSwiper={setSwiperRef}
            onReachEnd={() => {
              if (hasNextPage) {
                fetchNextPage();
              }
            }}
            slidesPerView={6}
            slidesPerGroup={5}
            centeredSlides={false}
            spaceBetween={18}
            navigation={true}
            watchOverflow={true}
            breakpoints={breakpoints}
            virtual
            // loop
          >
            {data.pages.map((page, pageIndex) => (
              <React.Fragment key={pageIndex}>
                {page.content.map((item: ContentData, index) => (
                  <S_SwiperSlide key={item.id} virtualIndex={index}>
                    <ItemCard item={item} />
                  </S_SwiperSlide>
                ))}
                {/* Use the ref on the last slide */}
                {pageIndex === data.pages.length - 1 && (
                  <div ref={lastSlideRef} />
                )}
              </React.Fragment>
            ))}
          </S_Swiper>
        </S_SwiperBox>
      </>
    );
  }
};

export default GenreSlide;

const S_SwiperBox = styled.div`
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

const S_GenreTitle = styled.h2`
  margin: 28px 0 5px 0;
  padding: 0px 3.75rem;
  color: var(--color-white-100);
  font-size: 24px;
  font-weight: 700;

  @media only screen and (max-width: 770px) {
    margin: 25px 0 5px 0;
    padding: 0px 2rem;
  }

  @media only screen and (max-width: 480px) {
    margin: 25px 0 5px 0;
    padding: 0px 1.25rem;
  }
`;