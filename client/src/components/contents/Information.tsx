import { AiOutlineHeart } from 'react-icons/ai';
import { FaRegThumbsUp } from 'react-icons/fa';
import styled from 'styled-components';
import netflix from '../../assets/ott/netflix.svg';
import tving from '../../assets/ott/tving.svg';
import disney from '../../assets/ott/disney.svg';
import watcha from '../../assets/ott/watcha.svg';
import coupang from '../../assets/ott/coupang.svg';

const Information = () => {
  return (
    <S_Wrapper backgroundimage="https://image.tving.com/upload/cms/caip/CAIP0900/P001716794.jpg/dims/resize/480">
      <div className="main-flex">
        <div className="title-flex">
          <S_Title>
            <img
              src="https://image.tving.com/upload/cms/caip/CAIP1800/P001716794.png/dims/resize/800"
              alt="title"
            />
          </S_Title>
          <div>
            <div className="poster-flex">
              <S_Poster>
                <img
                  src="https://image.tving.com/upload/cms/caip/CAIP0900/P001716794.jpg/dims/resize/480"
                  alt="poster"
                />
              </S_Poster>
              <div className="icon-flex">
                <S_IconFont>
                  <div>
                    <AiOutlineHeart color="white" size="40" />
                    <p>찜</p>
                  </div>
                </S_IconFont>
                <S_IconFont>
                  <div>
                    <FaRegThumbsUp color="white" size="40" />
                    <p>추천</p>
                  </div>
                  <p>13</p>
                </S_IconFont>
              </div>
            </div>
            <S_TitleFont>
              <h1>장르</h1>
              <div className="genre">
                <p>대충 예능, 적당한 액션</p>
              </div>
              <h1>OTT</h1>
              <div className="ott">
                <img src={netflix} alt="netflix" />
                <img src={tving} alt="tving" />
                <img src={disney} alt="disney" />
                <img src={watcha} alt="watcha" />
                <img src={coupang} alt="coupang" />
              </div>
              <p className="bold-white">크리에이터 &nbsp;&nbsp;&nbsp;나영석</p>
              <p className="bold-white margin">
                출연 &nbsp;&nbsp;&nbsp;베네딕트 컴버배치,치웨텔 에지오포,레이철
                맥아담스, 베네딕트 웡, 마이클 스툴바그, 벤자민 브랫
              </p>
              <p className="text">
                세계적으로 유명한 한 신경외과의사가 끔찍한 교통사고로 손을
                제대로 사용하지 못하게 된다. 그는 치료법을 찾는 과정에서 '카마르
                타지'라는 신비로운 힘을 가진 장소를 발견하고, 그곳이 현실을
                파괴하려는 보이지 않는 암흑 세력과 싸우는 최전선이라는 사실을
                깨닫는다.
              </p>
            </S_TitleFont>
          </div>
        </div>
      </div>
      <span />
    </S_Wrapper>
  );
};

export default Information;

const S_Wrapper = styled.section<{ backgroundimage: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px 0px;
  padding: 0 30px;
  width: 100vw;

  .main-flex {
    display: flex;
    justify-content: space-between;
  }

  .title-flex {
    display: flex;
    flex-direction: column;
  }

  .poster-flex {
    position: absolute;
    top: 0;
    right: 30px;
  }

  .icon-flex {
    display: flex;
    justify-content: center;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${(props) => props.backgroundimage});
    filter: blur(150px);
    opacity: 0.9;
    z-index: -1;
  }
  span {
    width: 1500px;
    height: 1px;
    background-color: var(--color-white-80);
  }

  @media only screen and (max-width: 768px) {
    .title-flex {
      align-items: center;
    }
    .poster-flex {
      top: 155px;
      right: 30px;
    }
  }

  @media only screen and (max-width: 620px) {
    padding: 0 40px;
    .main-flex {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .title-flex {
      align-items: center;
    }
    .poster-flex {
      position: static;
      display: flex;
      flex-direction: column;
    }
  }
`;

const S_Title = styled.div`
  width: 420px;
  height: 130px;
  img {
    object-fit: cover;
  }
`;

const S_TitleFont = styled.div`
  width: 60%;
  margin: 45px 0 30px 0;

  .genre {
    margin: 15px 0 30px 0;
  }
  .ott {
    margin: 15px 0 45px 0;
  }
  h1 {
    color: var(--color-white-100);
  }
  .bold-white {
    color: var(--color-white-80);
    font-weight: bold;
  }
  .margin {
    margin-top: 12px;
  }
  .text {
    color: var(--color-white-80);
    margin: 15px 0;
  }
  img {
    margin-right: 15px;
    cursor: pointer;
  }
  @media only screen and (max-width: 768px) {
    .margin {
      width: 60%;
    }
    .text {
      width: 60%;
    }
  }
  @media only screen and (max-width: 620px) {
    font-size: 13px;
    width: 100%;
    h1 {
      font-size: 14px;
    }
    .margin {
      width: 100%;
    }
    .text {
      width: 100%;
    }
  }
`;

const S_Poster = styled.div`
  width: 280px;
  height: 410px;
  align-self: flex-end;
  img {
    object-fit: cover;
  }

  @media only screen and (max-width: 768px) {
    margin-top: 20px;
    align-self: center;
  }

  @media only screen and (max-width: 620px) {
    margin-top: 20px;
    align-self: center;
  }
`;

const S_IconFont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--color-white-100);
  font-weight: bold;
  margin: 12px 24px;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    opacity: 0.8;
  }
  p {
    margin-top: 6px;
  }
`;
