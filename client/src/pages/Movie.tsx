import { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import BannerSlide from '../components/slide/BannerSlide';
// import GenreSlide from '../components/slide/GenreSlide';
import GenreSlide from '../components/slide/GenreSlider';
import styled from 'styled-components';
import ListBtns from '../components/ui/ListBtns';
import { scrollToTop } from '../utils/scrollToTop';
import { BannerImgsType } from '../types/types'
import bannerMovieImg1 from '../assets/banner_image/아바타 물의 길.webp';
import bannerMovieImg2 from '../assets/banner_image/코코.webp';
import bannerMovieImg3 from '../assets/banner_image/카운트.webp';
import bannerMovieImg4 from '../assets/banner_image/암살.webp';
import bannerMovieImg5 from '../assets/banner_image/기생충.webp';

const bannerMovieImgs: BannerImgsType = [
  {
    name: bannerMovieImg1,
    alt: '아바타 물의 길',
    id: 109
  },
  {
    name: bannerMovieImg2,
    alt: '코코',
    id: 326
  },
  {
    name: bannerMovieImg3,
    alt: '카운트',
    id: 654
  },
  {
    name: bannerMovieImg4,
    alt: '암살',
    id: 475
  },
  {
    name: bannerMovieImg5,
    alt: '기생충',
    id: 201
  },
];

const genres: string[] = [
  '액션',
  '드라마',
  'SF',
  '스릴러',
  '애니메이션',
  '코미디',
  '가족',
  '판타지',
  '로맨스',
  '공포',
  '범죄',
  '스포츠',
  '음악',
  'Made in Europe',
  'Reality TV',
  '역사',
  '다큐멘터리',
  '전쟁',
  '서부'
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
  }, [])

  const addMoreGenres = () => {
    const newGenres = genres.slice(currentIndex.current, currentIndex.current + 4);
    setVisibleGenres((genre) => [...genre, ...newGenres]);
    currentIndex.current = currentIndex.current + 4;
  }

  useEffect(() => {
    let timeoutId: number;

    if (inView && visibleGenres.length < genres.length) {
      timeoutId = setTimeout(() => {
        addMoreGenres()
      }, 100);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [inView, visibleGenres.length < genres.length]);

  scrollToTop();

  return (
    <S_Wrapper>
      <BannerSlide bannerImgs={bannerMovieImgs}/>
      <ListBtns />
      {visibleGenres.map((genre) => (
        <GenreSlide key={`movie-${genre}`} genre={genre} path='movie' />
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
