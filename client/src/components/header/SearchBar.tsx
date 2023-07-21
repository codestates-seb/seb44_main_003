import { styled } from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { GetAutoComplete } from '../../api/api';
import { FaXmark } from 'react-icons/fa6';
import { useModal } from '../../hooks/useModal';
import { FiSearch } from 'react-icons/fi';
import logo from '../../assets/logo/logo_white.webp';
import useMediaQuery from '../../hooks/useMediaQuery';

function SearchBar() {
  const [userInput, setUserInput] = useState('');
  const [currentOptionIdx, setCurrentOptionIdx] = useState(-1);
  const isMobile = useMediaQuery('(max-width: 600px)');
  const navigate = useNavigate();
  const { closeModal } = useModal();
  const { data } = useQuery(['searchData', userInput], () =>
    GetAutoComplete(userInput)
  );
  const reset = () => {
    setUserInput('');
    setCurrentOptionIdx(-1);
    closeModal();
  };
  const search = (keyword: string) => {
    if (keyword.trim().length) {
      navigate(`/search?keyword=${keyword}`);
      reset();
    }
  };
  const handleClick = () => {
    if (userInput.length) search(userInput);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };
  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (data && data.length) {
      if (e.keyCode === 40) {
        setCurrentOptionIdx((prev) => Math.min(prev + 1, data.length - 1));
      }
      if (e.keyCode === 38) {
        setCurrentOptionIdx((prev) => Math.max(prev - 1, 0));
      }
      if (currentOptionIdx >= 0 && e.key === 'Enter') {
        search(data[currentOptionIdx]);
      } else if (e.key === 'Enter') {
        search(userInput);
      }
      return;
    }
    if (e.key === 'Enter') {
      search(userInput);
    }
  };

  return (
    <S_Wrapper isMobile={isMobile}>
      <div>
        <img
          src={logo}
          onClick={() => {
            reset();
            navigate('/');
          }}
        />
        <FaXmark onClick={reset} />
      </div>
      <div>
        <label>
          <S_Input
            type="text"
            value={userInput}
            onChange={handleChange}
            onKeyUp={handleKeyUp}
            placeholder="제목, 인물명으로 검색해보세요."
            autoFocus
          />
        </label>
        <FiSearch onClick={handleClick} />
      </div>
      {data && !!data.length && (
        <ul className="auto-complete">
          {data.map((result, i) => (
            <li
              key={i}
              onClick={() => {
                search(result);
              }}
              className={currentOptionIdx === i ? 'currentOption' : ''}
            >
              {result}
            </li>
          ))}
        </ul>
      )}
    </S_Wrapper>
  );
}

export default SearchBar;

const S_Wrapper = styled.div<{ isMobile: boolean }>`
  max-width: 1500px;
  height: ${({ isMobile }) => (isMobile ? '100vh' : '300px')};
  width: 100%;
  position: absolute;
  top: 0;
  border-bottom: 2px solid var(--color-dropdown-stroke);
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translate(-50%, 0);
  padding: ${({ isMobile }) => (isMobile ? '20px 30px' : '20px 50px;')};
  background-color: var(--color-bg-100);
  > div:first-child {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  > div:nth-child(2) {
    position: relative;
    width: ${({ isMobile }) => (isMobile ? '90%' : '70%')};
    > svg {
      position: absolute;
      cursor: pointer;
      right: 10px;
      top: 27px;
    }
  }
  > ul.auto-complete {
    width: ${({ isMobile }) => (isMobile ? '90%' : '70%')};
    background-color: var(--color-bg-100);
    margin-top: -1px;
    padding-top: 0.5rem;
    z-index: 3;
    > li {
      width: 100%;
      padding: ${({ isMobile }) => (isMobile ? '0.5rem 1rem' : '0.3rem 1rem')};
      font-size: ${({ isMobile }) => (isMobile ? '14px' : undefined)};
      color: var(--color-white-80);
      cursor: pointer;
      &.currentOption {
        color: white;
        background-color: var(--color-white-20);
      }
    }
    > li:hover {
      color: white;
    }
  }
  & img {
    cursor: pointer;
    width: ${({ isMobile }) => (isMobile ? '80px' : undefined)};
  }
  & svg {
    font-size: ${({ isMobile }) => (isMobile ? '20px' : '25px')};
    color: white;
    cursor: pointer;
  }
  & label {
    border-bottom: 2px solid white;
    padding: 5px 0;
  }
`;

const S_Input = styled.input`
  width: 100%;
  margin-top: 20px;
  border: none;
  /* border-bottom: 2px solid white; */
  height: 42px;
  padding: 0 10px;
  font-size: 17px;
  background: transparent;
  color: var(--color-white-60);
`;
