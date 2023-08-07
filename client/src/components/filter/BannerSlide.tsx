import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SwiperCore, { EffectFade, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

SwiperCore.use([EffectFade, Pagination, Autoplay]);

const BannerSlide = ({
  bannerImgs,
}: {
  bannerImgs: { url: string; alt: string; id: number }[];
}) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <S_Wrapper>
      <S_SkeletonBox>{!imageLoaded && <S_Skeleton />}</S_SkeletonBox>
      <S_SwiperBox>
        <Swiper
          effect="fade"
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
        >
          {bannerImgs.map((image, index) => (
            <SwiperSlide key={index}>
              <S_BannerImage
                src={image.url}
                alt={image.alt}
                style={{ display: imageLoaded ? 'block' : 'none' }}
                onLoad={handleImageLoad}
                onClick={() => navigate(`/content/${image.id}`)}
              />
            </SwiperSlide>
          ))}
          <S_BlackLinear />
        </Swiper>
      </S_SwiperBox>
    </S_Wrapper>
  );
};

export default BannerSlide;

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

const S_SwiperBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  cursor: pointer;

  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-pagination-bullet {
    background: var(--color-white-100);
    width: 12px;
    height: 12px;
    --swiper-pagination-bullet-horizontal-gap: 6px;

    @media only screen and (max-width: 1024px) {
      width: 10px;
      height: 10px;
      --swiper-pagination-bullet-horizontal-gap: 5px;
    }

    @media only screen and (max-width: 600px) {
      width: 8px;
      height: 8px;
      --swiper-pagination-bullet-horizontal-gap: 3px;
    }
  }

  .swiper-pagination-bullet-active {
    background: var(--color-primary-yellow);
  }

  .swiper-pagination {
    bottom: calc(10px + 20px);
    left: 0px;
    z-index: 2;

    @media only screen and (max-width: 1024px) {
      bottom: calc(10px + 15px);
    }

    @media only screen and (max-width: 600px) {
      bottom: calc(10px + 5px);
    }
  }
`;

const S_BannerImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  z-index: 0;
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
  z-index: 1;

  @media only screen and (max-width: 1024px) {
    height: 100px;
  }

  @media only screen and (max-width: 600px) {
    height: 50px;
  }
`;
