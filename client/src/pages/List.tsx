import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import ListBtns from '../components/ui/ListBtns';
import { GetFilterdData } from '../api/api';
import InfinityScroll from '../components/silde/InfinityScroll';
import { ItemData } from '../types/types';

const List = () => {
  const [item, setItem] = useState<ItemData[]>([]);
  const [page, setPage] = useState(1);
  const size = 24;
  const path = useLocation().pathname;
  const ott = new URLSearchParams(location.search).get('ottNames');
  const genre = new URLSearchParams(location.search).get('genreNames');
  const selectedList = `${path}?page=${page}&size=${size}${
    genre ? `&genreNames=${genre}` : ''
  }${ott ? `&ottNames=${ott}` : ''}`;

  const { isLoading, data, error, isSuccess } = useQuery(
    ['selectedList', selectedList],
    () => GetFilterdData(selectedList),
    {
      staleTime: 5 * 60 * 1000,
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
    }
  );

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop === 0 && page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
    if (scrollHeight - scrollTop <= clientHeight) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [page]);

  useEffect(() => {
    if (isSuccess) {
      setItem((prevItem) => [...prevItem, ...data]);
    }
  }, [isSuccess]);

  if (isLoading) return <div>로딩</div>;

  if (error instanceof Error) return <a href="/">검색 결과 없음</a>;

  if (isSuccess) {
    return (
      <S_Wrapper>
        <S_BtnWrapper>
          <ListBtns />
        </S_BtnWrapper>
        <S_FlexWrap>
          {item.map((data: any) => (
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
  margin-bottom: 100px;
`;

const S_BtnWrapper = styled.div`
  width: 100%;
  padding: 130px 20px;
`;

const S_FlexWrap = styled.div`
  margin-left: 5vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;
