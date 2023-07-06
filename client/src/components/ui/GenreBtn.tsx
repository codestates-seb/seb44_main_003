import { useState } from 'react';
import styled from 'styled-components';

const GenreBtn = () => {
  const [selectedGenre, setSelectedGenre] = useState('');
  const [isOpen, setIsOpen] = useState(false);

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

  const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedGenre(e.target.value);
    setIsOpen(false);
  };

  const handleGenreClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <S_GenreBtn onClick={handleGenreClick}>장르 ▼</S_GenreBtn>
      {isOpen && (
        <S_LabelWrapper>
          {genres.map((genre) => (
            <S_Label key={genre.type}>
              <S_Input
                type="checkbox"
                value={genre.type}
                checked={selectedGenre === genre.type}
                onChange={handleGenreChange}
              />
              {genre.type}
            </S_Label>
          ))}
        </S_LabelWrapper>
      )}
    </>
  );
};

export default GenreBtn;

const S_GenreBtn = styled.div`
  font-size: 20px;
  color: var(--color-white-80);
  cursor: pointer;
`;

const S_LabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const S_Label = styled.label`
  display: flex;
  font-size: 20px;
  padding: 2px;
  color: var(--color-white-80);
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
