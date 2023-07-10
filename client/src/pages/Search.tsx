import styled from 'styled-components';
import InfinityScroll from '../components/slide/InfinityScroll';

const Search = () => {
  const keyword = new URLSearchParams(location.search).get('keyword') as string;

  return (
    <S_Wrapper>
      <InfinityScroll path="/search" query={keyword} />
    </S_Wrapper>
  );
};

export default Search;

const S_Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: hidden;
  justify-content: center;
`;
