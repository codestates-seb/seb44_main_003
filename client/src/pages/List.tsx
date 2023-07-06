import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import ListBtns from '../components/ListBtns';
import { GetFilterdData } from '../api/api';
import InfinityScroll from '../components/silde/InfinityScroll';

const List = () => {
  const path = useLocation().pathname;
  const ott = new URLSearchParams(location.search).get('ott');
  const genre = new URLSearchParams(location.search).get('genre');
  const selectedList = `${path}${genre ? `?genre=${genre}` : ''}${
    ott ? `${genre ? '&' : '?'}ott=${ott}` : ''
  }`;

  console.log(selectedList);

  const { isLoading, data, error, isSuccess } = useQuery(
    ['selectedList', selectedList],
    () => GetFilterdData(selectedList),
    {
      staleTime: 5 * 60 * 1000,
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) return <div>로딩</div>;

  if (error instanceof Error) return <a href="/">검색 결과 없음</a>;

  if (isSuccess) {
    return (
      <S_Wrapper>
        <S_BtnWrapper>
          <ListBtns />
        </S_BtnWrapper>
        <S_FlexWrap>
          {data.map((data: any) => (
            <InfinityScroll key={data.id} item={data} />
          ))}
        </S_FlexWrap>
      </S_Wrapper>
    );
  }
};

export default List;

const S_Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: hidden;
  justify-content: center;
`;

const S_BtnWrapper = styled.div`
  width: 100%;
  padding: 130px 20px;
`;

const S_FlexWrap = styled.div`
  margin-left: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;
