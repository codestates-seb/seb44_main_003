import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { styled, keyframes } from 'styled-components';
import 'swiper/css';
import 'swiper/css/pagination';
import { useModal } from '../../../../hooks/useModal';

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
          spaceBetween={15}
          centeredSlides={true}
          initialSlide={centeredSlideIndex}
          className="mySwiper"
        >
          {genres.map((genreText) => (
            <S_SwiperSlide onClick={() => handleClick(genreText)}>
              <h1 key={genreText}>{genreText}</h1>
            </S_SwiperSlide>
          ))}
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

const S_Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
`;

const S_Modal = styled.aside<{ isMount: boolean }>`
  position: absolute;
  display: flex;
  justify-content: center;
  right: 0;
  top: 0;
  width: 50vw;
  height: 100vh;
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
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: var(--color-white-60);
`;
