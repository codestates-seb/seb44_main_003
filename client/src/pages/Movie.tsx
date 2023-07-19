import { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import Banner from '../components/banner/Banner';
import GenreSlide from '../components/slide/GenreSlide';
import image from '../assets/기적의형제.webp';
import styled from 'styled-components';
import ListBtns from '../components/ui/ListBtns';
import { scrollToTop } from '../utils/scrollToTop';

function Movie() {
  const [visibleGenres, setVisibleGenres] = useState<Array<string>>([]);
  const currentIndex = useRef(4);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

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
      <Banner image={image} />
      <ListBtns />
      {visibleGenres.map((genre) => (
        <>
          <GenreSlide genre={genre} path='movie' />
        </>
      ))}
      <div ref={ref} className="target"></div>
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
