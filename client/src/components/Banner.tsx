import styled from 'styled-components';

const Banner = ({ image }: { image: string }) => {
  return (
    <S_Wrapper>
      <BannerImage src={image} alt={image}></BannerImage>
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
  width: 100%;
  height: 641px;
`

const BlackLinear = styled.div`
  position: absolute;
  width: 100%;
  height: 185px;
  background: linear-gradient(0deg, var(--color-bg-100) 0%, var(--color-bg-00) 100%);
  bottom: 0;
`