import { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import BannerSlide from '@/components/@common/slider/BannerSlide';
import GenreSlider from '@/components/@common/slider/GenreSlide';
import ListBtns from '@/components/@layout/navigators/ListBtns';
import { genres } from '@/constant/constantValue';
import { BannerImgsType } from '@/types/types';
import { scrollToTop } from '@/utils/scrollToTop';

const bannerMovieImgs: BannerImgsType = [
  {
    url: `${import.meta.env.VITE_IMAGE_URL}/banner_image/아바타 물의 길.webp`,
    alt: '아바타 물의 길',
    id: 109,
  },
  {
    url: `${import.meta.env.VITE_IMAGE_URL}/banner_image/코코.webp`,
    alt: '코코',
    id: 326,
  },
  {
    url: `${import.meta.env.VITE_IMAGE_URL}/banner_image/카운트.webp`,
    alt: '카운트',
    id: 654,
  },
  {
    url: `${import.meta.env.VITE_IMAGE_URL}/banner_image/암살.webp`,
    alt: '암살',
    id: 475,
  },
  {
    url: `${import.meta.env.VITE_IMAGE_URL}/banner_image/기생충.webp`,
    alt: '기생충',
    id: 201,
  },
];

function Movie() {
  const [visibleGenres, setVisibleGenres] = useState<Array<string>>([]);
  const currentIndex = useRef(4);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  useEffect(() => {
    const genreSlice = genres.slice(0, currentIndex.current);
    setVisibleGenres(genreSlice);
  }, []);

  const addMoreGenres = () => {
    const newGenres = genres.slice(
      currentIndex.current,
      currentIndex.current + 4
    );
    setVisibleGenres((genre) => [...genre, ...newGenres]);
    currentIndex.current = currentIndex.current + 4;
  };

  useEffect(() => {
    let timeoutId: number;

    if (inView && visibleGenres.length < genres.length) {
      timeoutId = window.setTimeout(() => {
        addMoreGenres();
      }, 100);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [inView, visibleGenres.length < genres.length]);

  scrollToTop();

  return (
    <S_Wrapper>
      <BannerSlide bannerImgs={bannerMovieImgs} />
      <ListBtns />
      {visibleGenres.map((genre) => (
        <GenreSlider key={`movie-${genre}`} genre={genre} path="movie" />
      ))}
      <div ref={ref} className="target" />
    </S_Wrapper>
  );
}

export default Movie;

const S_Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100vw;

  .target {
    height: 10px;
  }
`;
