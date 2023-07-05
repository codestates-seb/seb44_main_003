import Banner from '../components/Banner';
import Silder from '../components/Silder/Silder';
import image from '../assets/이번생도잘부탁해.webp'
import styled from 'styled-components';

const TV = () => {
  return (
    <S_Wrapper>
      <Banner image={image}/>
      <Silder/>
    </S_Wrapper>
  );
};

export default TV;

const S_Wrapper = styled.div`
  background: var(--color-bg-100);
  height: 100%;
`;