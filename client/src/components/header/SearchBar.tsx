import { styled } from 'styled-components';
import { FiSearch } from 'react-icons/fi';
import { useState } from 'react';

function SearchBar() {
  const [showSearchBar, setShowSearchBar] = useState(true);
  const handleClick = () => {
    setShowSearchBar(!showSearchBar);
  };
  return (
    <S_Wrapper>
      <S_Logo onClick={handleClick}>
        <FiSearch />
      </S_Logo>
      <form>{showSearchBar && <S_Input type="text" />}</form>
    </S_Wrapper>
  );
}

export default SearchBar;

const S_Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const S_Input = styled.input`
  width: 550px;
  height: 42px;
  padding: 2px 10px;
  flex-shrink: 0;
  border-radius: 5px;
  font-size: 17px;
  border: 1px solid var(--color-white-60);
  background: rgba(217, 217, 217, 0);
  color: var(--color-white-60);
`;

const S_Logo = styled.span`
  position: absolute;
  color: var(--color-white-60);
  font-size: 20px;
  right: 8px;
`;
