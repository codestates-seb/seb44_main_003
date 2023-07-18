import { useState, useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import styled, { keyframes } from 'styled-components';
import ItemCard from '../ui/ItemCard';
import { GetFilterdData, GetSearchedData } from './../../api/api';
import { useInView } from 'react-intersection-observer';
import { ContentData } from '../../types/types';
import { InfinityScrollLoading } from '../ui/exceptions/infinityScroll';
import noContents from '../../assets/exception/nocontents.svg';
import loadmore from '../../assets/exception/loadmore.svg';
import { ItemProps } from '../../types/types';

function InfinityScroll({ path, query }: { path: string; query: string }) {
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [size, setSize] = useState(getSize());
  let category = '';

  if (path.includes('tv')) {
    category = '/tv';
  }
  if (path.includes('movie')) {
    category = '/movie';
  }

  function getSize() {
    const width = window.innerWidth;

    if (width <= 480) {
      return 12;
    } else if (width <= 770) {
      return 16;
    } else if (width <= 1024) {
      return 20;
    } else {
      return 24;
    }
  }

  const { data, fetchNextPage, hasNextPage, status } = useInfiniteQuery(
    path.includes('search') ? ['search', query] : ['selectedList', query],
    ({ pageParam = 1 }) =>
      path.includes('search')
        ? GetSearchedData(`${query}&page=${pageParam}&size=${size}`)
        : GetFilterdData(
            `/medias${category}?page=${pageParam}&size=${size}&${query}`
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
    let timeoutId: number;

    if (inView && hasNextPage) {
      setIsLoadingMore(true);

      timeoutId = setTimeout(() => {
        fetchNextPage().then(() => {
          setIsLoadingMore(false);
        });
      }, 100);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [inView, hasNextPage]);

  useEffect(() => {
    const handleResize = () => {
      setSize(getSize());
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (status === 'loading') {
    return <InfinityScrollLoading path={path} />;
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
          data?.pages[0].totalResults !== 0 ? (
            <S_Text>
              {`'${query}' 검색 결과가 ${data?.pages[0].totalResults}개 있습니다.`}
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
          {data?.pages.map((page) => (
            <>
              {page.content.map((item: ContentData, index: number) => (
                <S_Item key={item.id} index={index + 1} size={size}>
                  <ItemCard item={item} />
                </S_Item>
              ))}
            </>
          ))}
          {isLoadingMore ? (
            <S_LoadMore>
              <p className="loadmore">Loading . . .</p>
              <img src={loadmore} alt="loadmore" />
            </S_LoadMore>
          ) : null}
          <div ref={ref} className="target"></div>
        </S_FlexWrap>
      </>
    );
  }
}

export default InfinityScroll;

const S_FlexWrap = styled.div`
  width: (100% - 40px);
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding-left: 20px;

  .target {
    width: 100vw;
    height: 10px;
  }

  @media only screen and (max-width: 1500px) {
    margin: 0;
  }
`;

const S_Item = styled.div<ItemProps>`
  width: calc(100% / ${({ size }) => size / 4} - 18px);
  margin: 0 0 50px 15px;

  @media only screen and (max-width: 1500px) {
    width: calc(100% / ${({ size }) => size / 4} - 17px);
    margin: ${({ index }) =>
      index % 6 === 0 ? '0 0 50px 0' : '0 15px 50px 0'};
  }

  @media only screen and (max-width: 1024px) {
    width: calc(100% / ${({ size }) => size / 4} - 16px);
    margin: ${({ index }) =>
      index % 5 === 0 ? '0 0 30px 0' : '0 15px 30px 0'};
  }

  @media only screen and (max-width: 770px) {
    width: calc(100% / ${({ size }) => size / 4} - 13px);
    margin: ${({ index }) =>
      index % 4 === 0 ? '0 0 30px 0' : '0 10px 30px 0'};
  }

  @media only screen and (max-width: 480px) {
    width: calc(100% / ${({ size }) => size / 4} - 13px);
    margin: ${({ index }) =>
      index % 3 === 0 ? '0 0 30px 0' : '0 10px 30px 0'};
  }
`;

const S_Text = styled.p`
  padding: 130px 0 60px 0;
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

const opacityAnimation = keyframes`
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
`;

const rotateAnimation = keyframes`
  0% { transform: rotate(-15deg); }
  50% { transform: rotate(30deg); }
  100% { transform: rotate(-15deg); }
`;

const S_LoadMore = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;

  .loadmore {
    font-size: 30px;
    font-weight: bold;
    color: var(--color-white-80);
    animation: ${opacityAnimation} 1s infinite;
  }
  img {
    width: 60px;
    padding: 20px 0 50px 0;
    animation: ${rotateAnimation} 2s infinite;
  }
`;
