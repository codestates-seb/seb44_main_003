import Banner from '../components/banner/Banner';
import SlideMovie from '../components/slide/SlideMovie';
import image from '../assets/기적의형제.webp';
import styled from 'styled-components';
import ListBtns from '../components/ui/ListBtns';
import { scrollToTop } from '../utils/scrollToTop';

function Movie() {
  const genres: string[] = [
    '액션',
    '드라마',
    'SF',
    '스릴러',
    // '애니메이션',
    // '코미디',
    // '가족',
    // '판타지',
    // '로맨스',
    // '공포',
    // '범죄',
    // '스포츠',
    // '음악',
    // 'Made in Europe',
    // 'Reality TV',
    // '역사',
    // '다큐멘터리',
    // '전쟁',
    // '서부'
  ];

  scrollToTop();

  return (
    <S_Wrapper>
      <Banner image={image} />
      <ListBtns />
      {genres.map((genre) => (
        <>
          <S_GenreTitle>{genre}</S_GenreTitle>
          <SlideMovie genre={genre} />
        </>
      ))}
    </S_Wrapper>
  );
}

export default Movie;

const S_Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100vw;
`;

const S_GenreTitle = styled.h2`
  margin: 28px 0 5px 0;
  padding: 0px 3.75rem;
  color: var(--color-white-100);
  font-size: 24px;
  font-weight: 700;
`;
