import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import InfiniteScroll from '@/components/@common/InfiniteScroll/InfiniteScroll';
import ListBtns from '@/components/@layout/navigators/ListBtns';
import { scrollToTop } from '@/utils/scrollToTop';

function List() {
  const path = useLocation().pathname;
  const ott = new URLSearchParams(location.search).get('ott');
  const genre = new URLSearchParams(location.search).get('genre');
  const selectedList = `${genre ? `genre=${genre}` : ''}${
    ott ? `&ott=${ott}` : ''
  }`;

  scrollToTop();

  return (
    <S_Wrapper>
      <S_BtnWrapper>
        <ListBtns />
      </S_BtnWrapper>
      <InfiniteScroll path={path} query={selectedList} />
    </S_Wrapper>
  );
}

export default List;

const S_Wrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

const S_BtnWrapper = styled.div`
  width: 100%;
  padding: 130px 0px 60px;

  @media only screen and (max-width: 480px) {
    padding: 80px 0 60px 0;
    font-size: 16px;
  }
`;
