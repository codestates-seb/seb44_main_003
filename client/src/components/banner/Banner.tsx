import styled from 'styled-components';

const Banner = ({ image }: { image: string }) => {
  return (
    <S_ImageBox>
      <S_BannerImage src={image} alt={image}/>
      <S_BlackLinear/>
    </S_ImageBox>
  )
}

export default Banner;

const S_ImageBox = styled.div`
  position: relative; 
  width: 100%;
`;

const S_BannerImage = styled.img`
  object-fit: cover;
`

const S_BlackLinear = styled.div`
  position: absolute;
  width: 100%;
  height: 185px;
  background: linear-gradient(
    0deg, 
    var(--color-bg-100) 0%, 
    var(--color-bg-00) 100%
  );
  bottom: 0;
`