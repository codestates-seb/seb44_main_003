import { styled } from 'styled-components';
import { FiSearch } from 'react-icons/fi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const [showSearchBar, setShowSearchBar] = useState(true);
  const navigate = useNavigate();
  const handleClick = () => {
    if (showSearchBar) {
      navigate('/');
      setShowSearchBar(false);
    } else setShowSearchBar(true);
  };
  return (
    <S_Wrapper>
      <S_Logo onClick={handleClick}>
        <FiSearch />
      </S_Logo>
      <form>
        <S_Input $show={showSearchBar} type="text" />
      </form>
    </S_Wrapper>
  );
}

export default SearchBar;

const S_Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
  width: 550px;
`;

const S_Input = styled.input<{ $show: boolean }>`
  width: ${(props) => (props.$show ? '550px' : '0')};
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

const S_Logo = styled.span`
  position: absolute;
  color: var(--color-white-60);
  font-size: 20px;
  right: 8px;
  margin-top: 8.5px;
  z-index: 9999;
`;
