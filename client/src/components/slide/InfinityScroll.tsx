import { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import ItemCard from '../ui/ItemCard';
import { GetFilterdData, GetSearchedData } from './../../api/api';
import { useInView } from 'react-intersection-observer';
import { ContentData } from '../../types/types';
import noContents from '../../assets/exception/nocontents.svg';
import { InfinityScrollLoading } from '../exceptions/infinityScroll';

const InfinityScroll = ({ path, query }: { path: string; query: string }) => {
  let category = '';

  if (path.includes('tv')) {
    category = '/tv';
  }
  if (path.includes('movie')) {
    category = '/movie';
  }

  const { data, fetchNextPage, hasNextPage, status } = useInfiniteQuery(
    path.includes('search') ? ['search', query] : ['selectedList', query],
    ({ pageParam = 1 }) =>
      path.includes('search')
        ? GetSearchedData(`${query}&page=${pageParam}&size=24`)
        : GetFilterdData(
            `/medias${category}?page=${pageParam}&size=24&${query}`
          ),
    {
      getNextPageParam: (lastPage) => {
        const currentPage = lastPage.currentPage;
        const totalPages = lastPage.totalPages;

        if (currentPage < totalPages) {
          return currentPage + 1;
        }

        return undefined;
      },
    }
  );

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  if (status === 'loading') {
    return <InfinityScrollLoading />;
  }

  if (status === 'error') return <div>Error</div>;

  const totalLength = (data?.pages || []).reduce(
    (acc, page) => acc + (page.content?.length || 0),
    0
  );

  if (status === 'success') {
    return (
      <>
        {path.includes('search') ? (
          totalLength !== 0 ? (
            <S_Text>
              {`'${query}' 검색 결과가 ${totalLength}개 있습니다.`}
            </S_Text>
          ) : (
            <S_NoContents>
              <S_Text>{`${query} 검색 결과가 없습니다.`}</S_Text>
              <img src={noContents} alt="noContents" />
            </S_NoContents>
          )
        ) : (
          totalLength === 0 && (
            <S_NoContents>
              <p className="noContents">해당 컨텐츠가 없습니다.</p>
              <img src={noContents} alt="noContents" />
            </S_NoContents>
          )
        )}
        <S_FlexWrap>
          {data.pages.map((page) => (
            <>
              {page.content.map((item: ContentData) => (
                <S_Item key={item.id}>
                  <ItemCard item={item} />
                </S_Item>
              ))}
            </>
          ))}
          <div ref={ref} className="target"></div>
        </S_FlexWrap>
      </>
    );
  }
};

export default InfinityScroll;

const S_FlexWrap = styled.div`
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-right: 0.5vw;

  .target {
    height: 10px;
  }
`;

const S_Item = styled.div`
  width: 225px;
  margin: 0 7.5px 50px;
`;

const S_Text = styled.p`
  padding: 390px 0 70px 0;
  font-size: 30px;
  font-weight: bold;
  color: var(--color-white-80);
`;

const S_NoContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;

  .noContents {
    padding: 160px 0 70px 0;
    font-size: 30px;
    font-weight: bold;
    color: var(--color-white-80);
  }
`;
