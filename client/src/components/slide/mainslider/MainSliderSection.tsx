import MainSlider from './MainSlider';
import styled from 'styled-components';
import Netflix from '../../../assets/ott/netflix_m.webp';
import Watcha from '../../../assets/ott/watcha_m.webp';
import Disney_Plus from '../../../assets/ott/disney_m.webp';
import Wavve from '../../../assets/ott/wavve_m.webp';

const ottList = [
  { ottName: 'Netflix', img: <img src={Netflix} /> },
  { ottName: 'Disney Plus', img: <img src={Disney_Plus} className="disney" /> },
  { ottName: 'Watcha', img: <img src={Watcha} /> },
  { ottName: 'Wavve', img: <img src={Wavve} /> },
];

const MainSliderSection = () => {
  return (
    <S_Wrapper>
      {ottList.map((ott, index) => (
        <div key={index}>
          <S_GenreTitle
            className={ott.ottName === 'Disney Plus' ? 'disney' : undefined}
          >
            {ott.img}
            <span>인기 TOP 10</span>
          </S_GenreTitle>
          <MainSlider ott={ott.ottName} />
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
  display: flex;
  align-items: center;
  &.disney {
    align-items: flex-end;
  }
  > img {
    width: 70px;
    margin-right: 8px;
  }
  margin: 28px 0 5px 0;
  padding: 0px 3.75rem;
  color: var(--color-white-100);
  font-size: 24px;
  font-weight: 700;

  @media only screen and (max-width: 770px) {
    margin: 25px 0 5px 0;
    padding: 0px 2rem;
  }

  @media only screen and (max-width: 480px) {
    margin: 25px 0 5px 0;
    padding: 0px 1.25rem;
  }
`;
