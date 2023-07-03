import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import styled from 'styled-components';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Autoplay, Pagination, Mousewheel, EffectCoverflow } from 'swiper';
import ModalHover from './ModalHover';

const items = [
  {
    image:
      'https://i.namu.wiki/i/Uu2YDFFnBy2JkKYs1oeOxdzzcnXJhcnuNy2ecxYF9RGCVGyCu1XftFsHLOlbsW8OX3Ch2NhMhcRB6qteKhXHXQ.webp',
    text: '이미지 1 텍스트',
  },
  {
    image:
      'https://i.namu.wiki/i/Uu2YDFFnBy2JkKYs1oeOxdzzcnXJhcnuNy2ecxYF9RGCVGyCu1XftFsHLOlbsW8OX3Ch2NhMhcRB6qteKhXHXQ.webp',
    text: '이미지 2 텍스트',
  },
  {
    image:
      'https://i.namu.wiki/i/Uu2YDFFnBy2JkKYs1oeOxdzzcnXJhcnuNy2ecxYF9RGCVGyCu1XftFsHLOlbsW8OX3Ch2NhMhcRB6qteKhXHXQ.webp',
    text: '이미지 3 텍스트',
  },
  {
    image:
      'https://i.namu.wiki/i/Uu2YDFFnBy2JkKYs1oeOxdzzcnXJhcnuNy2ecxYF9RGCVGyCu1XftFsHLOlbsW8OX3Ch2NhMhcRB6qteKhXHXQ.webp',
    text: '이미지 4 텍스트',
  },
  {
    image:
      'https://i.namu.wiki/i/Uu2YDFFnBy2JkKYs1oeOxdzzcnXJhcnuNy2ecxYF9RGCVGyCu1XftFsHLOlbsW8OX3Ch2NhMhcRB6qteKhXHXQ.webp',
    text: '이미지 5 텍스트',
  },
];

export default function Carousel() {
  const [isModal, setIsModal] = useState(false);

  const handleModalOpen = () => {
    setIsModal(true);
  };

  const handleModalClose = () => {
    setIsModal(false);
  };

  return (
    <>
      <S_Wrapper>
        <S_Swiper
          slidesPerView={3}
          centeredSlides={true}
          effect={'coverflow'}
          coverflowEffect={{
            rotate: 12,
            stretch: -40,
            depth: 200,
            modifier: 3,
            slideShadows: true,
          }}
          autoplay={{
            delay: 80000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            type: 'bullets',
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
            renderBullet: (_: any, className: string) => {
              return `<span class="${className}"></span>`;
            },
          }}
          mousewheel={true}
          modules={[Autoplay, Pagination, Mousewheel, EffectCoverflow]}
          className="mySwiper"
        >
          {items.map((item, idx) => {
            return (
              <StyledSwiperSlide key={idx}>
                <StyledImage
                  src={item.image}
                  onMouseOver={handleModalOpen}
                  onMouseOut={handleModalClose}
                />
              </StyledSwiperSlide>
            );
          })}
        </S_Swiper>
      </S_Wrapper>
      {isModal && <ModalHover />}
    </>
  );
}

const S_Wrapper = styled.div`
  width: 100%;
  height: 450px;
  background-color: var(--color-bg-100);
  background-position: center;
  background-size: cover;
  transition: background-image 1s ease-in-out;
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  position: relative;
  height: 400px;
  display: flex;
  align-items: center;
  border-radius: 10px;
`;

const StyledImage = styled.img`
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;

const S_Swiper = styled(Swiper)`
  width: 100%;
  height: 100%;
  box-shadow: none;
  .swiper-wrapper {
    display: flex;
    align-items: center;
  }
  .swiper-slide-shadow-left,
  .swiper-slide-shadow-right {
    display: none;
  }
  .swiper-pagination-bullet {
    background-color: var(--color-white-100);
    opacity: 0.4;
    border-radius: 50%;
    width: 8px;
    height: 8px;
  }
  .swiper-pagination-bullet-active {
    opacity: 1;
  }
`;
