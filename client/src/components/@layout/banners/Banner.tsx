import { useState } from 'react';
import styled from 'styled-components';

const Banner = ({ image }: { image: string }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <S_Wrapper>
      <S_SkeletonBox>{!imageLoaded && <S_Skeleton />}</S_SkeletonBox>
      <S_BannerBox>
        <S_BannerImage
          src={image}
          alt={image}
          style={{ display: imageLoaded ? 'block' : 'none' }}
          onLoad={handleImageLoad}
        />
      </S_BannerBox>
      <S_BlackLinear />
    </S_Wrapper>
  );
};

export default Banner;

const S_Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 0;
  padding-bottom: calc(7 / 16 * 100%);
`;

const S_SkeletonBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const S_Skeleton = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--color-dropdown);
`;

const S_BannerBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const S_BannerImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
`;

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
`;
