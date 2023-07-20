import { styled } from 'styled-components';
import { FiSearch } from 'react-icons/fi';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { GetAutoComplete } from '../../api/api';
import { FaXmark } from 'react-icons/fa6';
import { useModal } from '../../hooks/useModal';
import { FiSearch } from 'react-icons/fi';
import logo from '../../assets/logo/logo_white.webp';
import useMediaQuery from '../../hooks/useMediaQuery';

function SearchBar() {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [currentOptionIdx, setCurrentOptionIdx] = useState(-1);
  const isMobile = useMediaQuery('(max-width: 600px)');
  const navigate = useNavigate();
  const ref = useRef<HTMLInputElement>(null);
  const { data } = useQuery(['searchData', userInput], () =>
    GetAutoComplete(userInput)
  );
  const reset = () => {
    setUserInput('');
    setShowSearchBar(false);
    setCurrentOptionIdx(-1);
  };
  const search = (keyword: string) => {
    if (keyword.trim().length) {
      navigate(`/search?keyword=${keyword}`);
      reset();
    }
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
  const handleClick = () => {
    if (showSearchBar && userInput.length) search(userInput);
    else setShowSearchBar(!showSearchBar);
    if (ref.current) ref.current.focus();
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
        <S_Input
          type="text"
          value={userInput}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          placeholder="제목, 인물명으로 검색해보세요."
          autoFocus
        />
        <FiSearch onClick={handleClick} />
      </div>
      {data && !!data.length && (
        <ul className="auto-complete">
          <FaXmark onClick={reset} />
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
      right: 20px;
      top: 27px;
    }
  }
  > ul.auto-complete {
    width: ${({ isMobile }) => (isMobile ? '90%' : '70%')};
    background-color: var(--color-bg-100);
    display: block;
    margin-top: -1px;
    padding-top: 0.5rem;
    border: 1px solid var(--color-white-80);
    border-radius: 0 0 1rem 1rem;
    z-index: 3;
    > svg {
      font-size: 20px;
      position: absolute;
      right: 10px;
      top: 10px;
      color: white;
      cursor: pointer;
    }
    > li {
      width: 100%;
      padding: ${({ isMobile }) => (isMobile ? '0.5rem 1rem' : '0.3rem 1rem')};
      font-size: ${({ isMobile }) => (isMobile ? '14px' : undefined)};
      color: var(--color-white-80);
      cursor: pointer;
      transition: color 0.3s ease;
      &.currentOption {
        background-color: var(--color-white-20);
      }
    }
    > li:last-child {
      padding-bottom: 0.5rem;
      border-radius: 0 0 1rem 1rem;
    }
    > li:hover {
      color: white;
      background-color: var(--color-white-20);
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
`;

const S_Input = styled.input<{ $show: boolean }>`
  width: ${(props) => (props.$show ? '100%' : '0')};
  min-width: 40px;
  max-width: 678px;
  opacity: ${(props) => (props.$show ? 1 : 0)};
  visibility: ${(props) => (props.$show ? 'visible' : 'hidden')};
  height: 42px;
  padding: 2px 10px;
  flex-shrink: 0;
  border-radius: 5px;
  font-size: 17px;
  border: 1px solid var(--color-white-60);
  background: rgba(217, 217, 217, 0);
  color: var(--color-white-60);
  transition: width 1s ease, opacity 1s ease, visibility 1s ease;
`;

const S_Logo = styled.button`
  position: absolute;
  color: var(--color-white-60);
  font-size: 20px;
  right: 8px;
  margin-top: 10px;
  z-index: 9998;
  transition: color 0.3s ease;
  &:hover {
    color: white;
  }
`;
