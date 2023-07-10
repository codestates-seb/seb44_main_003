import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { GetSearchedData } from '../api/api';
import InfinityScroll from '../components/slide/InfinityScroll';

const Search = () => {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get('keyword');

  const { isLoading, data, error, isSuccess } = useQuery(
    ['keyword', keyword],
    () => GetSearchedData(keyword),
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
        <S_Text>'{keyword}' 검색 결과가 ??개 있습니다.</S_Text>
        <S_FlexWrap>
          {data.map((data: any) => (
            <InfinityScroll key={data.id} item={data} />
          ))}
        </S_FlexWrap>
      </S_Wrapper>
    );
  }
};

export default Search;

const S_Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: hidden;
  justify-content: center;
`;

const S_Text = styled.p`
  padding: 160px 0 70px 0;
  font-size: 30px;
  font-weight: bold;
  color: var(--color-white-80);
`;

const S_FlexWrap = styled.div`
  margin-left: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;
