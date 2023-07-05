import Banner from '../components/banner/Banner';
import SildeMovie from '../components/silde/SildeMovie';
import image from '../assets/기적의형제.webp'
import styled from 'styled-components';

const Movie = () => {
  return (
    <S_Wrapper>
      <Banner image={image}/>
      <SildeMovie/>
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