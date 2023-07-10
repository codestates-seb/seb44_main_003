import { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import ItemCard from '../ui/ItemCard';
import SkeletonItemCard from '../ui/SkeletonItemCard';
import { GetFilterdData, GetSearchedData } from './../../api/api';
import { useInView } from 'react-intersection-observer';
import { ContentData } from '../../types/types';

const InfinityScroll = ({ path, query }: { path: string; query: string }) => {
  let category = '';

  if (path.includes('tv')) {
    category = '/tv';
  }
  if (path.includes('movie')) {
    category = '/movie';
  }
  console.log(query);
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
    return (
      <S_FlexWrap>
        {Array.from({ length: 24 }, (_, index) => (
          <S_Item key={index}>
            <SkeletonItemCard />
          </S_Item>
        ))}
      </S_FlexWrap>
    );
  }

  if (status === 'error') return <S_Error>검색 결과 없음</S_Error>;

  if (status === 'success') {
    const totalLength = (data?.pages || []).reduce(
      (acc, page) => acc + (page.content?.length || 0),
      0
    );
    return (
      <>
        {path.includes('search') && (
          <S_Text>
            '{query}' 검색 결과가 {totalLength}개 있습니다.
          </S_Text>
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
  padding: 160px 0 70px 0;
  font-size: 30px;
  font-weight: bold;
  color: var(--color-white-80);
`;

const S_Error = styled.div`
  width: 100vw;
  height: 400px;
  color: white;
`;
