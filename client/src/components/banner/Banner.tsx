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
  display: flex;
  justify-content: center;
  width: 100%;
  height: 660px;

  @media only screen and (max-width: 1200px) {
    height: 500px;
  }

  @media only screen and (max-width: 1024px) {
    height: 350px;
  }
  
  @media only screen and (max-width: 770px) {
    height: 260px;
  }

  @media only screen and (max-width: 480px) {
    height: 180px;
  }
`;

const S_BannerImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
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