import MainSlider from './MainSlider';
import styled from 'styled-components';

const MainSliderSection = () => {
  const mainContentTitle = [
    {
      title: '조잉에서 꼭 봐야하는 컨텐츠',
      genre: '드라마'
    },
    {
      title: '조잉 유저들이 가장 많이 추천한 컨텐츠',
      genre: '로맨스'
    },
    {
      title: '추천 최신작',
      genre: '판타지'
    }
  ];

  return (
    <S_Wrapper>
      {mainContentTitle.map((content, index) => (
        <div key={index}>
          <S_GenreTitle>{content.title}</S_GenreTitle>
          <MainSlider genre={content.genre}/>
        </div>
      ))}
    </S_Wrapper>
  );
};

export default MainSliderSection;

const S_Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100vw;
`;

const S_GenreTitle = styled.h2`
  margin: 28px 0 5px 0;
  padding: 0px 3.75rem;
  color: var(--color-white-100);
  font-size: 24px;
  font-weight: 700;
`;
