import { useState } from 'react';
import { BiCameraMovie } from 'react-icons/bi';
import { IoIosTv } from 'react-icons/io';
import { PiMagicWandFill } from 'react-icons/pi';
import { PiCaretRightThin } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import Recommend from '@/components/detail/Recommend';
import { useModal } from '@/hooks/useModal';

function MainBanner() {
  const navigate = useNavigate();
  const { openModal } = useModal();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <S_Wrapper>
      <S_SkeletonBox>{!imageLoaded && <S_Skeleton />}</S_SkeletonBox>
      <S_MainBackground
        src={`${import.meta.env.VITE_IMAGE_URL}/main/main_background.webp`}
        alt="메인 배경"
        style={{ display: imageLoaded ? 'block' : 'none' }}
        onLoad={handleImageLoad}
      />
      <S_BlackLinear />
      <S_Container>
        <S_Banner>
          <S_MainText
            src={`${import.meta.env.VITE_IMAGE_URL}/main/main_text.webp`}
            alt="메인 텍스트"
          />
        </S_Banner>
        <S_Nav>
          <S_ContentsBox onClick={() => navigate('/tv')}>
            <S_Contents>
              <IoIosTv />
              <h3>
                TV 컨텐츠 <span>둘러보기</span>
              </h3>
              <p>다양한 TV 컨텐츠를 한눈에!</p>
            </S_Contents>
            <PiCaretRightThin className="arrow" />
          </S_ContentsBox>
          <S_ContentsBox onClick={() => navigate('/movie')}>
            <S_Contents>
              <BiCameraMovie />
              <h3>
                영화 컨텐츠 <span>둘러보기</span>
              </h3>
              <p>여러 장르의 영화를 모아보자!</p>
            </S_Contents>
            <PiCaretRightThin className="arrow" />
          </S_ContentsBox>
          <S_ContentsBox onClick={() => openModal({ content: <Recommend /> })}>
            <S_Contents>
              <PiMagicWandFill />
              <h3>추천해조잉</h3>
              <p>구독 중인 OTT의 맞춤 컨텐츠를 추천해드려요</p>
            </S_Contents>
            <PiCaretRightThin className="arrow" />
          </S_ContentsBox>
        </S_Nav>
      </S_Container>
    </S_Wrapper>
  );
}

export default MainBanner;

const S_Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 70px;
  width: 100%;
  height: 100%;
  overflow: hidden;

  @media only screen and (max-width: 1024px) {
    padding-top: 70px;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  @media only screen and (max-width: 600px) {
    padding-top: 60px;
  }
`;

const S_SkeletonBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const S_Skeleton = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--color-bg-100);
`;

const S_MainBackground = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  animation: appear 1.5s linear -0.5s;
`;

const S_Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px 3.75rem;
  width: 100%;

  @media only screen and (max-width: 770px) {
    padding: 0px 1.25rem;
  }
`;

const S_Banner = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0 50px 0;
  width: 50%;

  @media only screen and (max-width: 1024px) {
    margin: 10px 0 40px 0;
  }

  @media only screen and (max-width: 600px) {
    margin: 5px 0 25px 0;
  }
`;

const S_MainText = styled.img`
  object-fit: cover;
  height: 100%;
  animation: appear-bottom 1.2s linear;
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
`;

const S_Nav = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  width: 100%;
  gap: 18px;
  z-index: 3;

  @media only screen and (max-width: 600px) {
    margin-bottom: 20px;
  }

  > div:first-child {
    animation: appear-side 1.5s linear -0.7s;

    @media only screen and (max-width: 1024px) {
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

    @media only screen and (max-width: 1024px) {
      animation: appear-bottom 1.5s linear -0.7s;
    }
  }

  > div:nth-child(3) {
    animation: appear-side 1.5s linear -0.3s;

    @media only screen and (max-width: 1024px) {
      animation: appear-bottom 1.5s linear -0.7s;
    }
  }
`;

const S_ContentsBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px 30px;
  width: calc(100% / 3 - 10px);
  border: 1px solid white;
  border-radius: 10px;
  background-color: var(--color-dropdown);
  color: white;
  font-size: 17px;
  cursor: pointer;

  @media only screen and (max-width: 1024px) {
    justify-content: center;
    padding: 15px;
  }

  @media only screen and (max-width: 600px) {
    padding: 10px;
  }

  & svg {
    font-size: 35px;
    margin-bottom: 5px;

    @media only screen and (max-width: 1024px) {
      font-size: 30px;
    }

    @media only screen and (max-width: 1024px) {
      font-size: 25px;
    }

    @media only screen and (max-width: 600px) {
      font-size: 20px;
    }
  }

  & svg.arrow {
    font-size: 28px;
    color: var(--color-white-80);
    @media only screen and (max-width: 1024px) {
      display: none;
    }
  }

  &:hover {
    filter: brightness(120%);
  }

  &:active {
    filter: brightness(90%);
  }
`;

const S_Contents = styled.div`
  word-break: keep-all;
  @media only screen and (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  @media only screen and (max-width: 600px) {
    font-size: 14px;
  }

  & h3 {
    font-size: 20px;
    margin-bottom: 5px;

    @media only screen and (max-width: 1024px) {
      font-size: 17px;
    }

    @media only screen and (max-width: 1024px) {
      font-size: 16px;
    }

    @media only screen and (max-width: 600px) {
      font-size: 14px;
    }

    > span {
      @media only screen and (max-width: 1024px) {
        display: none;
      }
    }
  }

  & p {
    font-size: 16px;
    color: var(--color-white-80);

    @media only screen and (max-width: 1024px) {
      font-size: 14px;
    }

    @media only screen and (max-width: 1024px) {
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

  @media only screen and (max-width: 1024px) {
    height: 100px;
  }

  @media only screen and (max-width: 600px) {
    height: 50px;
  }
`;
