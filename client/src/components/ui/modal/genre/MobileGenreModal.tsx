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
  const navigate = useNavigate();
  const { closeModal } = useModal();
  let centeredSlideIndex = genres.findIndex((text) => text === genre);

  const handleClick = (genre: string) => {
    centeredSlideIndex = genres.findIndex((text) => text === genre);
    if (path === '/tv' || path === '/movie') {
      return navigate(`${path}/list?genre=${genre}`), closeModal();
    }
    let navigateUrl = `${path}?genre=${genre}${
      ott !== null ? `&ott=${ott}` : ''
    }`;
    navigate(navigateUrl), closeModal();
  };

  return (
    <S_Wrapper>
      <S_Modal>
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

const S_Wrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  justify-content: flex-end;
`;

const S_Modal = styled.aside`
  display: flex;
  justify-content: center;
  width: 50vw;
  height: 100vh;
  background-color: var(--color-bg-80);
  animation: ${slideInAnimation} 0.5s ease-out;
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
