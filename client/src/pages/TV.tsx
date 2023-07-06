import Banner from '../components/banner/Banner';
import SildeTV from '../components/silde/SildeTV';
import image from '../assets/이번생도잘부탁해.webp';
import styled from 'styled-components';
import ListBtns from '../components/ui/ListBtns';

const TV = () => {
  return (
    <S_Wrapper>
      <Banner image={image} />
      <ListBtns />
      <SildeTV />
    </S_Wrapper>
  );
};

export default TV;

const S_Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100vw;
`;
