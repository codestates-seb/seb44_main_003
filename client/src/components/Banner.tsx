import styled from 'styled-components';
import BannerImage1 from '../assets/이번생도잘부탁해.webp';

const Banner = () => {
  return (
    <S_Wrapper>
      <BannerImage src={BannerImage1} alt='이번생도잘부탁해'></BannerImage>
      <BlackLinear></BlackLinear>
    </S_Wrapper>
  )
}

export default Banner;

const S_Wrapper = styled.div`
  position: relative;
  z-index: 1;
`;

const BannerImage = styled.img`
  display: block;
  object-fit: cover;
  /* left: 0px;
  right: 0px; */
  width: 100%;
  height: 641px;
  /* height: 100%; */
`

const BlackLinear = styled.div`
  position: absolute;
  width: 100%;
  height: 185px;
  background: linear-gradient(0deg, var(--color-bg-100) 0%, var(--color-bg-00) 100%);
  bottom: 0;
`