import { useState, useEffect } from 'react';
import { GetMovieData } from '../../api/api';
import { ItemData } from '../../types/types';
import Item from '../ui/ItemCard';
import styled from 'styled-components';
import SwiperCore, { Virtual, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

// install Virtual module
SwiperCore.use([Virtual, Navigation]);

const SildeMovie = () => {
  const [, setSwiperRef] = useState<SwiperCore | null>(null);
  const genres: string[] = [
    '드라마',
    '액션',
    '로맨스',
    '애니',
    '코미디',
    '판타지',
    '스릴러',
    '호러',
    '음악',
    '사극',
    '다큐멘터리',
    '스포츠'
  ];
  const [movieData, setMovieData] = useState<ItemData[][]>([]); // Movie 데이터를 저장할 상태
  useEffect(() => {
    Promise.all(
      genres.map((genre) => {
        return GetMovieData()
          .then((data) => {
            const filteredData = data.filter((movie) => movie.genre.includes(genre));
            return filteredData;
          })
          .catch((error) => {
            console.error(`'${genre}' 장르의 Movie 데이터 가져오기 실패:`, error);
            return [];
          });
      })
    )
      .then((results) => {
        setMovieData(results);
      })
      .catch((error) => {
        console.error('Movie 데이터 가져오기 실패:', error);
        setMovieData([]);
      });
  }, []);

  return (
    <S_Wrapper>
      {genres.map((genre, index) => (
        <S_Genrelist key={index}>
          <S_GenreTitle>{genre}</S_GenreTitle>
          {movieData[index] ? (
            <S_Swiper
              onSwiper={setSwiperRef}
              slidesPerView={6} // 한 슬라이드에 보여줄 갯수
              centeredSlides={false} // 센터 모드
              spaceBetween={18} // 슬라이드 사이 여백
              navigation={true} // 버튼
              watchOverflow={true}
              virtual
            >
              {movieData[index].map((data: ItemData, slideIndex: number) => (
                <S_SwiperSlide key={data.id} virtualIndex={slideIndex}>
                  <Item data={data} />
                </S_SwiperSlide>
              ))}
            </S_Swiper>
          ) : (
            <S_LoadingMessage>Loading Movie data...</S_LoadingMessage>
          )}
        </S_Genrelist>
      ))}
    </S_Wrapper>
  );
};

export default SildeMovie;

const S_Wrapper = styled.div`
  position: relative;
  overflow-x: hidden; // 가로 스크롤 숨김
  margin: 0;
  padding: 0px 3.75rem;
  width: 100%;
`;

const S_Genrelist = styled.div`
  margin-bottom: 3.75rem;
`;

const S_GenreTitle = styled.h2`
  margin: 28px 0 10px 0;
  color: var(--color-white-100);
  font-size: 24px;
  font-weight: 700;
`;

const S_Swiper = styled(Swiper)`
  display: flex;
  overflow: visible; // 요소의 내용이 요소의 크기를 넘어갈 경우에도 내용을 표시
  margin: 20px auto;

  .swiper-button-prev,
  .swiper-button-next {
    top: 50%;
    margin: 0;
    padding: 1.5rem;
    height: 100%;
    transform: translateY(-50%);
    background-repeat: no-repeat;
    background: var(--color-bg-60);
    color: var(--color-white-100);
    text-shadow: 4px 4px 10px rgba(0, 0, 0, 0.4);
    z-index: 10;
    --swiper-navigation-size: 2.5rem;
    opacity: 0;
  }
  .swiper-button-prev {
    left: -3.75rem;
  }
  .swiper-button-next {
    right: -3.75rem;
  }

  &:hover {
    .swiper-button-prev,
    .swiper-button-next {
      opacity: 1;
      transition: opacity 0.3s ease;
    }
  } 
`

const S_SwiperSlide = styled(SwiperSlide)`
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
  filter: var(--shadow-l-40);
  cursor: pointer;
  &:hover {
    transform: translateY(-15px);
  }
`;

const S_LoadingMessage = styled.div`
  color: var(--color-white-80);
`;