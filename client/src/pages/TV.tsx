import { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import BannerSlide from '@/components/filter/BannerSlide';
import GenreSlide from '@/components/filter/GenreSlide';
import ListBtns from '@/components/filter/ListBtns';
import { BannerImgsType } from '@/types/types';
import { scrollToTop } from '@/utils/scrollToTop';

const bannerTvImgs: BannerImgsType = [
  {
    url: `${import.meta.env.VITE_IMAGE_URL}/banner_image/마당이 있는 집.webp`,
    alt: '마당이 있는 집',
    id: 4,
  },
  {
    url: `${import.meta.env.VITE_IMAGE_URL}/banner_image/최애의 아이.webp`,
    alt: '최애의 아이',
    id: 8,
  },
  {
    url: `${import.meta.env.VITE_IMAGE_URL}/banner_image/셀러브리티.webp`,
    alt: '셀러브리티',
    id: 59,
  },
  {
    url: `${import.meta.env.VITE_IMAGE_URL}/banner_image/킹더랜드.webp`,
    alt: '킹더랜드',
    id: 19,
  },
  {
    url: `${
      import.meta.env.VITE_IMAGE_URL
    }/banner_image/이번 생도 잘 부탁해.webp`,
    alt: '이번 생도 잘 부탁해',
    id: 11,
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
  '서부',
];

function TV() {
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
      timeoutId = setTimeout(() => {
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
      <BannerSlide bannerImgs={bannerTvImgs} />
      <ListBtns />
      {visibleGenres.map((genre) => (
        <GenreSlide key={`tv-${genre}`} genre={genre} path="tv" />
      ))}
      <div ref={ref} className="target" />
    </S_Wrapper>
  );
}

export default TV;

const S_Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100vw;

  .target {
    height: 10px;
  }
`;
