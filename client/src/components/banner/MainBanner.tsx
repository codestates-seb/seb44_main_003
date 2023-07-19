import { styled } from 'styled-components';
import mainImg from '../../assets/main_background.png';
import { IoIosTv } from 'react-icons/io';
import { BiCameraMovie } from 'react-icons/bi';
import { PiMagicWandFill } from 'react-icons/pi';
import { PiCaretRightThin } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../hooks/useModal';
import Recommend from '../ui/questions/RecommendModal';

function MainBanner() {
  const navigate = useNavigate();
  const { openModal } = useModal();
  return (
    <S_Wrapper>
      <img src={mainImg} />
      <S_BlackLinear />
      <div className="banner">
        <div>
          <h2>
            <span>내가 보고 싶은 그 드라마..</span>
            <span>어느 OTT에서 볼 수 있지?</span>
          </h2>
          <h1>
            <span>조잉이</span> <span>다 찾아조잉!</span>
          </h1>
        </div>
      </div>
      <div className="nav">
        <div onClick={() => navigate('/tv')}>
          <div>
            <IoIosTv />
            <h3>
              TV 컨텐츠 <span>둘러보기</span>
            </h3>
            <p>다양한 TV 컨텐츠를 한눈에!</p>
          </div>
          <PiCaretRightThin className="arrow" />
        </div>
        <div onClick={() => navigate('/movie')}>
          <div>
            <BiCameraMovie />
            <h3>
              영화 컨텐츠 <span>둘러보기</span>
            </h3>
            <p>여러 장르의 영화를 모아보자!</p>
          </div>
          <PiCaretRightThin className="arrow" />
        </div>
        <div onClick={() => openModal({ content: <Recommend /> })}>
          <div>
            <PiMagicWandFill />
            <h3>추천해조잉</h3>
            <p>구독 중인 OTT의 맞춤 컨텐츠를 추천해드려요</p>
          </div>
          <PiCaretRightThin className="arrow" />
        </div>
      </div>
    </S_Wrapper>
  );
}

export default MainBanner;

const S_Wrapper = styled.div`
  padding-top: 120px;
  width: 100%;
  height: 820px;
  display: flex;
  position: relative;
  overflow: hidden;
  @media only screen and (max-width: 1095px) {
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 570px;
  }
  & img {
    position: absolute;
    top: 0;
    width: 1500px;
    height: 1500px;
    object-fit: cover;
    opacity: 0.2;
    z-index: -1;
    animation: appear 1.5s linear -0.5s;
  }
  > div.banner {
    display: flex;
    position: relative;
    margin-bottom: 50px;
    padding: 5px 80px;
    @media only screen and (max-width: 1095px) {
      flex-grow: 1;
      align-items: center;
      margin-bottom: 0;
      padding: 0;
    }
    > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
    }
    & h2 {
      color: white;
      font-size: 30px;
      margin-bottom: 15px;
      animation: appear 1.5s linear -0.3s;
      @media only screen and (max-width: 1213px) {
        font-size: 23px;
      }
      @media only screen and (max-width: 665px) {
        display: flex;
        flex-direction: column;
        font-size: 18px;
        line-height: 1.6;
        margin-bottom: 20px;
      }
    }
    & h1 {
      background: linear-gradient(
        to bottom,
        var(--color-primary-yellow),
        var(--color-primary-gold)
      );
      color: transparent;
      background-clip: text;
      -webkit-background-clip: text;
      font-size: 80px;
      animation: appear 1.5s linear -0.1s;
      @keyframes appear {
        from {
          filter: brightness(0);
          transform: translate(0, 80px);
        }
        to {
          filter: brightness(1);
          transform: translate(0, 0);
        }
      }
      @media only screen and (max-width: 1213px) {
        font-size: 65px;
      }

      @media only screen and (max-width: 665px) {
        display: flex;
        flex-direction: column;
        font-size: 55px;
      }
    }
  }

  > div.nav {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-right: 80px;
    flex-grow: 1;
    align-items: end;
    z-index: 3;
    @media only screen and (max-width: 1095px) {
      flex-direction: row;
      flex-grow: 0;
      width: 70vw;
      margin-right: 0;
      margin-bottom: 20px;
    }
    @media only screen and (max-width: 900px) {
      width: 90vw;
    }
    > div:first-child {
      animation: appear-side 1.5s linear -0.7s;
      @media only screen and (max-width: 1095px) {
        animation: appear-bottom 1.5s linear -0.7s;
      }
      @keyframes appear-side {
        from {
          filter: brightness(0);
          transform: translate(80px, 0);
        }
        to {
          filter: brightness(1);
          transform: translate(0, 0);
        }
      }
      @keyframes appear-bottom {
        from {
          filter: brightness(0);
          transform: translate(0, 40px);
        }
        to {
          filter: brightness(1);
          transform: translate(0, 0);
        }
      }
    }
    > div:nth-child(2) {
      animation: appear-side 1.5s linear -0.5s;
      @media only screen and (max-width: 1095px) {
        animation: appear-bottom 1.5s linear -0.7s;
      }
    }
    > div:nth-child(3) {
      animation: appear-side 1.5s linear -0.3s;
      @media only screen and (max-width: 1095px) {
        animation: appear-bottom 1.5s linear -0.7s;
      }
    }
    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 400px;
      height: 150px;
      margin-bottom: 20px;
      padding: 20px 10px 20px 30px;
      border: 1px solid white;
      border-radius: 10px;
      background-color: var(--color-dropdown);
      color: white;
      font-size: 17px;
      cursor: pointer;
      @media only screen and (max-width: 1277px) {
        width: 350px;
      }
      @media only screen and (max-width: 1095px) {
        margin: 0 5px;
        height: 90px;
        flex-grow: 1;
        padding: 15px;
        min-width: 80px;
      }
      @media only screen and (max-width: 665px) {
        height: 70px;
      }
    }
    > div:hover {
      filter: brightness(120%);
    }
    > div:active {
      filter: brightness(90%);
    }
    & h3 {
      font-size: 20px;
      margin-bottom: 5px;
      @media only screen and (max-width: 1277px) {
        font-size: 17px;
        font-weight: 400;
      }
      @media only screen and (max-width: 1095px) {
        font-size: 16px;
      }
      @media only screen and (max-width: 665px) {
        font-size: 14px;
      }
      > span {
        @media only screen and (max-width: 1095px) {
          display: none;
        }
      }
    }
  }
  & p {
    font-size: 16px;
    color: var(--color-white-80);
    @media only screen and (max-width: 1277px) {
      font-size: 14px;
    }
    @media only screen and (max-width: 1095px) {
      display: none;
    }
  }
  & svg {
    font-size: 35px;
    margin-bottom: 15px;
    @media only screen and (max-width: 1277px) {
      font-size: 30px;
    }
    @media only screen and (max-width: 1095px) {
      font-size: 25px;
      margin-bottom: 5px;
    }
    @media only screen and (max-width: 665px) {
      font-size: 20px;
    }
  }
  & svg.arrow {
    font-size: 28px;
    color: var(--color-white-80);
    @media only screen and (max-width: 1095px) {
      display: none;
    }
  }
`;
const S_BlackLinear = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 185px;
  background: linear-gradient(
    0deg,
    var(--color-bg-100) 0%,
    var(--color-bg-00) 100%
  );
  z-index: 2;
`;
