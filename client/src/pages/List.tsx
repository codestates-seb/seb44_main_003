import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { GetSearchedData } from '../api/api';
import InfinityScroll from '../components/silde/InfinityScroll';
import OttBtn from '../components/ui/OttBtn';

const List = () => {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get('keyword');

  // const { isLoading, data, error, isSuccess } = useQuery(
  //   ['keyword', keyword],
  //   () => GetSearchedData(keyword),
  //   {
  //     staleTime: 5 * 60 * 1000,
  //     cacheTime: Infinity,
  //     refetchOnWindowFocus: false,
  //   }
  // );

  // if (isLoading) return <div>로딩</div>;

  // if (error instanceof Error) return <a href="/">검색 결과 없음</a>;

  // if (isSuccess) {
  return (
    <S_Wrapper>
      <S_BtnWrapper>
        <OttBtn />
      </S_BtnWrapper>
      <S_FlexWrap>
        {/* {data.map((data: any) => (
          <InfinityScroll key={data.id} data={data} />
        ))} */}
      </S_FlexWrap>
    </S_Wrapper>
  );
};
// };

export default List;

const S_Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: hidden;
  justify-content: center;
`;

const S_BtnWrapper = styled.p`
  width: 100%;
  padding: 130px 0 70px 10px;
`;

const S_FlexWrap = styled.div`
  margin-left: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;
