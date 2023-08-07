import { useState } from 'react';
import { RxDoubleArrowUp, RxDoubleArrowDown } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
import { styled, keyframes } from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { useModal } from '@/hooks/useModal';

function MobileGenreModal({
  genres,
  path,
  ott,
  genre,
}: {
  genres: string[];
  path: string;
  ott: string | null;
  genre: string | null;
}) {
  const [isMount, setIsMount] = useState(true);

  const navigate = useNavigate();
  const { closeModal } = useModal();
  let centeredSlideIndex = genres.findIndex((text) => text === genre);

  const handleClick = (genre: string) => {
    centeredSlideIndex = genres.findIndex((text) => text === genre);
    if (path === '/tv' || path === '/movie') {
      return navigate(`${path}/list?genre=${genre}`);
    }
    let navigateUrl = `${path}?genre=${genre}${
      ott !== null ? `&ott=${ott}` : ''
    }`;
    navigate(navigateUrl);
  };

  const handleClickOutside = () => {
    setIsMount(false);
    setTimeout(() => {
      closeModal();
    }, 200);
  };

  return (
    <S_Wrapper onClick={handleClickOutside}>
      <S_Modal isMount={isMount}>
        <S_Swiper
          direction={'vertical'}
          slidesPerView={15}
          centeredSlides={true}
          initialSlide={centeredSlideIndex + 1}
          className="mySwiper"
        >
          <S_SwiperSlide className="arrow">
            <S_RxDoubleArrowUp size={30} />
          </S_SwiperSlide>
          {genres.map((genreText) => (
            <S_SwiperSlide
              key={genreText}
              onClick={() => handleClick(genreText)}
            >
              <h1>{genreText}</h1>
            </S_SwiperSlide>
          ))}
          <S_SwiperSlide className="arrow">
            <S_RxDoubleArrowDown size={30} />
          </S_SwiperSlide>
        </S_Swiper>
      </S_Modal>
    </S_Wrapper>
  );
}

export default MobileGenreModal;

const slideInAnimation = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideOutAnimation = keyframes`
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(100%);
  }
`;

const moveUpAnimation = keyframes`
  0% {
    transform: translateY(0%);
  }
  50% {
    transform: translateY(-50%);
  }
  100% {
    transform: translateY(0%);
  }
`;

const moveDownAnimation = keyframes`
  0% {
    transform: translateY(-50%);
  }
  50% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(-50%);
  }
`;

const S_Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;

  svg {
    color: white;
  }
`;

const S_Modal = styled.aside<{ isMount: boolean }>`
  position: absolute;
  display: flex;
  justify-content: center;
  right: 0;
  top: 0;
  width: 50vw;
  height: 100vh;
  z-index: 1;
  background-color: var(--color-bg-80);
  animation: ${({ isMount }) =>
      isMount ? slideInAnimation : slideOutAnimation}
    0.3s ease-out;
`;

const S_Swiper = styled(Swiper)`
  display: flex;
  overflow: visible;

  .swiper-slide-active {
    transition: all 0.5s ease-out;
    color: var(--color-white-100);
  }
`;

const S_SwiperSlide = styled(SwiperSlide)`
  width: 100vw;
  padding: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: var(--color-white-60);

  svg {
    color: var(--color-white-60);
  }

  &.arrow {
    cursor: auto;
  }
`;

const S_RxDoubleArrowUp = styled(RxDoubleArrowUp)`
  margin-bottom: 50px;
  animation: ${moveUpAnimation} 1s infinite ease-out;
`;

const S_RxDoubleArrowDown = styled(RxDoubleArrowDown)`
  margin-top: 50px;
  animation: ${moveDownAnimation} 1s infinite ease-out;
`;
