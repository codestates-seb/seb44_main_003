import { SetStateAction, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import styled from 'styled-components';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Autoplay, Pagination, Mousewheel, EffectCoverflow } from 'swiper';
import img1 from '../assets/gif/1.gif';
// import img2 from '../assets/2.gif';
// import img3 from '../assets/3.gif';
// import img4 from '../assets/4.gif';
// import img5 from '../assets/5.gif';

const items = [
  { image: img1, text: '이미지 1 텍스트' },
  { image: img1, text: '이미지 2 텍스트' },
  { image: img1, text: '이미지 3 텍스트' },
  { image: img1, text: '이미지 4 텍스트' },
  { image: img1, text: '이미지 5 텍스트' },
];

export default function Carousel() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSlideChange = (swiper: {
    activeIndex: SetStateAction<number>;
  }) => {
    setCurrentImageIndex(swiper.activeIndex);
  };

  return (
    <>
      <S_Wrapper background={items[currentImageIndex].image}>
        <S_Swiper
          slidesPerView={3}
          centeredSlides={true}
          effect={'coverflow'}
          coverflowEffect={{
            rotate: 10,
            stretch: -40,
            depth: 200,
            modifier: 3,
            slideShadows: true,
          }}
          autoplay={{
            delay: 8000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            type: 'bullets',
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
            renderBullet: (_: null, className: string) => {
              return `<span class="${className}"></span>`;
            },
          }}
          mousewheel={true}
          onSlideChange={handleSlideChange}
          modules={[Autoplay, Pagination, Mousewheel, EffectCoverflow]}
          className="mySwiper"
        >
          {items.map((item, idx) => {
            return (
              <StyledSwiperSlide key={idx}>
                <StyledImage src={item.image} />
              </StyledSwiperSlide>
            );
          })}
        </S_Swiper>
      </S_Wrapper>
    </>
  );
}

const S_Wrapper = styled.div<{ background: string }>`
  width: 100%;
  height: 450px;
  max-width: 1500px;
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(${(props) => props.background});
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
