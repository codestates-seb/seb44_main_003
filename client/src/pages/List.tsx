import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ListBtns from '../components/ui/ListBtns';
import InfinityScroll from '../components/slide/InfinityScroll';
import { scrollToTop } from '../utils/scrollToTop';

const List = () => {
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
      <InfinityScroll path={path} query={selectedList} />
    </S_Wrapper>
  );
};

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
`;
