import { styled } from 'styled-components';
import { FiSearch } from 'react-icons/fi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [userInput, setUserInput] = useState('');
  const navigate = useNavigate();
  const search = () => {
    if (userInput.trim().length) {
      navigate(`/search/${userInput}`);
      setUserInput('');
      setShowSearchBar(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };
  const handleClick = () => {
    if (showSearchBar && userInput.length) search();
    else setShowSearchBar(!showSearchBar);
  };
  const handleKeyUp = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.code === 'Enter') search();
  };

  return (
    <S_Wrapper $show={showSearchBar}>
      <S_Input
        $show={showSearchBar}
        type="text"
        onChange={handleChange}
        onKeyUp={handleKeyUp}
      />
      <S_Logo onClick={handleClick}>
        <FiSearch />
      </S_Logo>
    </S_Wrapper>
  );
}

export default SearchBar;

const S_Wrapper = styled.div<{ $show: boolean }>`
  display: flex;
  justify-content: flex-end;
  position: relative;
  width: ${(props) => (props.$show ? '100%' : '30px')};
  transition: width 1s ease;
`;

const S_Input = styled.input<{ $show: boolean }>`
  width: ${(props) => (props.$show ? '100%' : '0')};
  min-width: 120px;
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
  margin-top: 8.5px;
  z-index: 9998;
`;
