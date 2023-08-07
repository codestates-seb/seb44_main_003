import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import InfiniteScroll from '@/components/@common/InfiniteScroll/InfiniteScroll';

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
      <InfiniteScroll path="/search" query={keyword} />
    </S_Wrapper>
  );
}

export default Search;

const S_Wrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  justify-content: center;
`;
