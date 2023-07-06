import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const GenreBtn = () => {
  const [selectedGenre, setSelectedGenre] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const ott = new URLSearchParams(location.search).get('ott');
  const genres = [
    { type: '애니' },
    { type: '코미디' },
    { type: '로맨스' },
    { type: '드라마' },
    { type: '액션' },
    { type: '스릴러' },
    { type: '판타지' },
    { type: '호러' },
    { type: '다큐멘터리' },
    { type: '사극' },
    { type: '스포츠' },
    { type: '음악' },
  ];
  const genreBtnRef = useRef(null);

  const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.value;
    setSelectedGenre(e.target.value);

    if (path === '/tv' || path === '/movie') {
      return navigate(`${path}/list?genre=${selected}`);
    }

    let navigateUrl = `${path}?genre=${selected}`;
    if (ott) {
      navigateUrl = `${path}?genre=${selected}&ott=${ott}`;
    }
    navigate(navigateUrl);
  };

  const handleGenreClick = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      genreBtnRef.current &&
      !(genreBtnRef.current as HTMLDivElement).contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <GenreBtnContainer ref={genreBtnRef}>
      <S_GenreBtn onClick={handleGenreClick}>장르 ▼</S_GenreBtn>
      {isOpen && (
        <S_LabelWrapper>
          {Array.from({ length: Math.ceil(genres.length / 4) }).map(
            (_, index) => (
              <S_LabelRow key={index}>
                {genres.slice(index * 4, (index + 1) * 4).map((genre) => (
                  <S_Label key={genre.type}>
                    <S_Input
                      type="checkbox"
                      value={genre.type}
                      checked={selectedGenre === genre.type}
                      onChange={handleGenreChange}
                    />
                    <S_Text>{genre.type}</S_Text>
                  </S_Label>
                ))}
              </S_LabelRow>
            )
          )}
        </S_LabelWrapper>
      )}
    </GenreBtnContainer>
  );
};

export default GenreBtn;

const GenreBtnContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const S_GenreBtn = styled.div`
  font-size: 20px;
  color: var(--color-white-80);
  cursor: pointer;
`;

const S_LabelWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  border: 1px solid gainsboro;
  border-radius: 5px;
  padding: 4px;
  top: 100%;
  left: 10;
`;

const S_LabelRow = styled.div`
  display: flex;
`;

const S_Label = styled.label`
  width: 125px;
  display: flex;
  align-items: center;
`;

const S_Text = styled.div`
  color: var(--color-white-60);
  padding: 4px;
  font-size: 18px;
  font-weight: bold;
  margin: 0;
  cursor: pointer;
  transition: color 0.3s ease-out;
  &:hover {
    color: var(--color-white-80);
  }
  input[type='checkbox']:checked + & {
    color: var(--color-primary-gold);
  }
`;

const S_Input = styled.input`
  appearance: none;
  border: 1.5px solid gainsboro;
  border-radius: 4px;
  width: 24px;
  height: 24px;
  cursor: pointer;

  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: var(--color-primary-gold);
  }
`;
