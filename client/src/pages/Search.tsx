import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import InfinityScroll from '../components/slide/InfinityScroll';

function Search() {
  const [keyword, setKeyword] = useState('');
  const location = useLocation();

  useEffect(() => {
    const newKeyword =
      new URLSearchParams(location.search).get('keyword') || '';
    setKeyword(newKeyword);
  }, [location.search]);

  return (
    <S_Wrapper>
      <InfinityScroll path="/search" query={keyword} />
    </S_Wrapper>
  );
}

export default Search;

const S_Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  justify-content: center;
`;
