import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Netflix from '../../assets/ott/netflix.svg';
import tving from '../../assets/ott/tving.svg';
import DisneyPlus from '../../assets/ott/disney.svg';
import Watcha from '../../assets/ott/watcha.svg';
import wavve from '../../assets/ott/wavve.svg';

const OttBtn = () => {
  const path = useLocation().pathname;
  const ott = new URLSearchParams(location.search).get('ottNames');
  const genre = new URLSearchParams(location.search).get('genreNames');

  const urlData = {
    Netflix: ott?.includes('Netflix') ? 'Netflix' : '',
    'Disney Plus': ott?.includes('Disney Plus') ? 'Disney Plus' : '',
    Watcha: ott?.includes('Watcha') ? 'Watcha' : '',
    wavve: ott?.includes('wavve') ? 'wavve' : '',
    tving: ott?.includes('tving') ? 'tving' : '',
  };
  const [selectedOtt, setSelectedOtt] = useState(urlData);
  const navigate = useNavigate();

  const handleBtnClick = (e: React.MouseEvent<EventTarget>) => {
    const ott = (e.target as HTMLImageElement).alt;
    if (
      ott === 'Netflix' ||
      ott === 'Disney Plus' ||
      ott === 'Watcha' ||
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
    if (path === '/medias/tv' || path === '/medias/movie') {
      const genreValue = genre ? `genreNames=${genre}&` : '';
      const ottValue = Object.values(selectedOtt);
      if (ottValue.every((str) => str === '')) {
        navigate(`/medias${path}?${genreValue}`);
      } else {
        const selectedOtt = ottValue.filter((str) => str !== '').join(',');
        navigate(`${path}?${genreValue}ottNames=${selectedOtt}`);
      }
    }
  }, [selectedOtt]);

  if (path === '/tv' || path === '/movie') {
    let test = '?genreNames=로맨스&';
    return (
      <>
        <S_Ott
          src={Netflix}
          alt="Netflix"
          onClick={() => navigate(`/medias${path}${test}ottNames=Netflix`)}
        />
        <S_Ott
          src={DisneyPlus}
          alt="Disney Plus"
          onClick={() => navigate(`/medias${path}${test}ottNames=Disney Plus`)}
        />
        <S_Ott
          src={Watcha}
          alt="Watcha"
          onClick={() => navigate(`/medias${path}${test}ottNames=Watcha`)}
        />
        <S_Ott
          src={wavve}
          alt="wavve"
          onClick={() => navigate(`/medias${path}${test}ottNames=wavve`)}
        />
        <S_Ott
          src={tving}
          alt="tving"
          onClick={() => navigate(`/medias${path}${test}ottNames=Netflix`)}
        />
      </>
    );
  }

  return (
    <>
      <S_Ott
        src={Netflix}
        alt="Netflix"
        className={selectedOtt.Netflix ? '' : 'dark'}
        onClick={(e: React.MouseEvent<EventTarget>) => {
          handleBtnClick(e);
        }}
      />
      <S_Ott
        src={DisneyPlus}
        alt="Disney Plus"
        className={selectedOtt['Disney Plus'] ? '' : 'dark'}
        onClick={(e: React.MouseEvent<EventTarget>) => {
          handleBtnClick(e);
        }}
      />
      <S_Ott
        src={Watcha}
        alt="Watcha"
        className={selectedOtt.Watcha ? '' : 'dark'}
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
