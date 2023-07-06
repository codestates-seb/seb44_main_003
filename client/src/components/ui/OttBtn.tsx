import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import netflix from '../../assets/ott/netflix.svg';
import tving from '../../assets/ott/tving.svg';
import disney from '../../assets/ott/disney.svg';
import watcha from '../../assets/ott/watcha.svg';
import wavve from '../../assets/ott/wavve.svg';

const OttBtn = () => {
  const currentPath = window.location.pathname;
  const currentOtts = new URL(window.location.href).searchParams.get('ott');
  const currentGenre = new URL(window.location.href).searchParams.get('genre');
  const urlData = {
    netflix: currentOtts?.includes('netflix') ? 'netflix' : '',
    disney: currentOtts?.includes('disney') ? 'disney' : '',
    watcha: currentOtts?.includes('watcha') ? 'watcha' : '',
    wavve: currentOtts?.includes('wavve') ? 'wavve' : '',
    tving: currentOtts?.includes('tving') ? 'tving' : '',
  };
  const [isFiltered, setFiltered] = useState(urlData);
  const navigate = useNavigate();

  const handleBtnClick = (ott: string) => {
    if (
      ott === 'netflix' ||
      ott === 'disney' ||
      ott === 'watcha' ||
      ott === 'wavve' ||
      ott === 'tving'
    ) {
      if (isFiltered[ott] === '') {
        setFiltered((prev) => ({ ...prev, [ott]: ott }));
      } else {
        setFiltered((prev) => ({ ...prev, [ott]: '' }));
      }
    }
  };

  useEffect(() => {
    const genre = currentGenre ? `genre=${currentGenre}&` : '';
    const ottValue = Object.values(isFiltered);
    if (ottValue.every((str) => str === '')) {
      navigate(`${currentPath}?${genre}`);
    } else {
      const selectedOtt = ottValue.filter((str) => str !== '').join(',');
      navigate(`${currentPath}?${genre}&ott=${selectedOtt}`);
    }
  }, [isFiltered]);

  if (currentPath === '/tv' || currentPath === '/movie') {
    return (
      <S_WrapTvMovie>
        <S_Ott
          src={netflix}
          alt="netflix"
          onClick={() => navigate(`${currentPath}/list?ott=netflix`)}
        />
        <S_Ott
          src={disney}
          alt="disney"
          onClick={() => navigate(`${currentPath}/list?ott=disney`)}
        />
        <S_Ott
          src={watcha}
          alt="watcha"
          onClick={() => navigate(`${currentPath}/list?ott=watcha`)}
        />
        <S_Ott
          src={wavve}
          alt="wavve"
          onClick={() => navigate(`${currentPath}/list?ott=wavve`)}
        />
        <S_Ott
          src={tving}
          alt="tving"
          onClick={() => navigate(`${currentPath}/list?ott=tving`)}
        />
      </S_WrapTvMovie>
    );
  }

  return (
    <>
      <S_Ott
        src={netflix}
        alt="netflix"
        className={isFiltered.netflix ? '' : 'dark'}
        onClick={(e: React.MouseEvent<EventTarget>) => {
          const target = e.target as HTMLImageElement;
          handleBtnClick(target.alt);
        }}
      />
      <S_Ott
        src={disney}
        alt="disney"
        className={isFiltered.disney ? '' : 'dark'}
        onClick={(e: React.MouseEvent<EventTarget>) => {
          const target = e.target as HTMLImageElement;
          handleBtnClick(target.alt);
        }}
      />
      <S_Ott
        src={watcha}
        alt="watcha"
        className={isFiltered.watcha ? '' : 'dark'}
        onClick={(e: React.MouseEvent<EventTarget>) => {
          const target = e.target as HTMLImageElement;
          handleBtnClick(target.alt);
        }}
      />
      <S_Ott
        src={wavve}
        alt="wavve"
        className={isFiltered.wavve ? '' : 'dark'}
        onClick={(e: React.MouseEvent<EventTarget>) => {
          const target = e.target as HTMLImageElement;
          handleBtnClick(target.alt);
        }}
      />
      <S_Ott
        src={tving}
        alt="tving"
        className={isFiltered.tving ? '' : 'dark'}
        onClick={(e: React.MouseEvent<EventTarget>) => {
          const target = e.target as HTMLImageElement;
          handleBtnClick(target.alt);
        }}
      />
    </>
  );
};

export default OttBtn;

const S_WrapTvMovie = styled.div`
  position: relative;
  top: 0;
  left: 60px;
  z-index: 1;
`;

const S_Ott = styled.img`
  box-shadow: var(--shadow-box-m-25);
  margin-right: 15px;
  cursor: pointer;

  &.dark {
    filter: saturate(0);
    opacity: 0.8;
  }
`;
