import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import netflix from '../../assets/ott/netflix.svg';
import tving from '../../assets/ott/tving.svg';
import disney from '../../assets/ott/disney.svg';
import watcha from '../../assets/ott/watcha.svg';
import wavve from '../../assets/ott/wavve.svg';

const OttBtn = () => {
  const path = useLocation().pathname;
  const ott = new URLSearchParams(location.search).get('ott');
  const genre = new URLSearchParams(location.search).get('genre');

  const urlData = {
    netflix: ott?.includes('netflix') ? 'netflix' : '',
    disney: ott?.includes('disney') ? 'disney' : '',
    watcha: ott?.includes('watcha') ? 'watcha' : '',
    wavve: ott?.includes('wavve') ? 'wavve' : '',
    tving: ott?.includes('tving') ? 'tving' : '',
  };
  const [selectedOtt, setSelectedOtt] = useState(urlData);
  const navigate = useNavigate();

  const handleBtnClick = (e: React.MouseEvent<EventTarget>) => {
    const ott = (e.target as HTMLImageElement).alt;
    if (
      ott === 'netflix' ||
      ott === 'disney' ||
      ott === 'watcha' ||
      ott === 'wavve' ||
      ott === 'tving'
    ) {
      if (selectedOtt[ott] === '') {
        setSelectedOtt((prev) => ({ ...prev, [ott]: ott }));
      } else {
        setSelectedOtt((prev) => ({ ...prev, [ott]: '' }));
      }
    }
  };

  useEffect(() => {
    const genreValue = genre ? `genre=${genre}&` : '';
    const ottValue = Object.values(selectedOtt);
    if (ottValue.every((str) => str === '')) {
      navigate(`${path}?${genreValue}`);
    } else {
      const selectedOtt = ottValue.filter((str) => str !== '').join(',');
      navigate(`${path}?${genreValue}ott=${selectedOtt}`);
    }
  }, [selectedOtt]);

  if (path === '/tv' || path === '/movie') {
    return (
      <>
        <S_Ott
          src={netflix}
          alt="netflix"
          onClick={() => navigate(`${path}/list?ott=netflix`)}
        />
        <S_Ott
          src={disney}
          alt="disney"
          onClick={() => navigate(`${path}/list?ott=disney`)}
        />
        <S_Ott
          src={watcha}
          alt="watcha"
          onClick={() => navigate(`${path}/list?ott=watcha`)}
        />
        <S_Ott
          src={wavve}
          alt="wavve"
          onClick={() => navigate(`${path}/list?ott=wavve`)}
        />
        <S_Ott
          src={tving}
          alt="tving"
          onClick={() => navigate(`${path}/list?ott=netflix`)}
        />
      </>
    );
  }

  return (
    <>
      <S_Ott
        src={netflix}
        alt="netflix"
        className={selectedOtt.netflix ? '' : 'dark'}
        onClick={(e: React.MouseEvent<EventTarget>) => {
          handleBtnClick(e);
        }}
      />
      <S_Ott
        src={disney}
        alt="disney"
        className={selectedOtt.disney ? '' : 'dark'}
        onClick={(e: React.MouseEvent<EventTarget>) => {
          handleBtnClick(e);
        }}
      />
      <S_Ott
        src={watcha}
        alt="watcha"
        className={selectedOtt.watcha ? '' : 'dark'}
        onClick={(e: React.MouseEvent<EventTarget>) => {
          handleBtnClick(e);
        }}
      />
      <S_Ott
        src={wavve}
        alt="wavve"
        className={selectedOtt.wavve ? '' : 'dark'}
        onClick={(e: React.MouseEvent<EventTarget>) => {
          handleBtnClick(e);
        }}
      />
      <S_Ott
        src={tving}
        alt="tving"
        className={selectedOtt.tving ? '' : 'dark'}
        onClick={(e: React.MouseEvent<EventTarget>) => {
          handleBtnClick(e);
        }}
      />
    </>
  );
};

export default OttBtn;

const S_Ott = styled.img`
  box-shadow: var(--shadow-box-m-25);
  margin-right: 15px;
  cursor: pointer;

  &.dark {
    filter: saturate(0);
    opacity: 0.8;
  }
`;
