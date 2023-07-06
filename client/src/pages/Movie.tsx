import Banner from '../components/banner/Banner';
import SildeMovie from '../components/silde/SildeMovie';
import image from '../assets/기적의형제.webp';
import styled from 'styled-components';
import ListBtns from '../components/ListBtns';

const Movie = () => {
  // const genres: string[] = [
  //   '드라마',
  //   '액션',
  //   '로맨스',
  //   '애니',
  //   '코미디',
  //   '판타지',
  //   '스릴러',
  //   '호러',
  //   '음악',
  //   '사극',
  //   '다큐멘터리',
  //   '스포츠'
  // ];

  return (
    <S_Wrapper>
      <Banner image={image} />
      <ListBtns />
      <SildeMovie />
    </S_Wrapper>
  );
};

export default Movie;

const S_Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100vw;
`;
