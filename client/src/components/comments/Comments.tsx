import { useQuery } from '@tanstack/react-query';
import { GetComments } from '../../api/api';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { useState } from 'react';
import CommentContent from './CommentContent';
import { AiOutlineComment } from 'react-icons/ai';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import {
  COMMENTS_PER_PAGE,
  PAGES_PER_SECTION,
} from '../../constant/constantValue';

function Comments() {
  const [page, setPage] = useState(1);
  const [pageSection, setPageSection] = useState(1);
  const { id } = useParams() as { id: string };
  const { data, isSuccess } = useQuery({
    queryKey: ['comments', page],
    queryFn: () => GetComments({ id, page }),
    staleTime: 5000,
    keepPreviousData: true,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
  });

  if (isSuccess) {
    const length = data.totalReviews;
    const pagesNum = Math.ceil(length / COMMENTS_PER_PAGE);
    const lastPageSection = Math.ceil(pagesNum / PAGES_PER_SECTION);
    const startNum = 1 + (pageSection - 1) * PAGES_PER_SECTION;
    const isFirstPageSection = pageSection === 1;
    const isLastPageSection = pageSection === lastPageSection;
    return (
      <S_Wrapper>
        <h1>
          <AiOutlineComment /> 후기 {data.totalReviews}
        </h1>
        <ul>
          {data.reviews.map((comment) => (
            <CommentContent comment={comment} />
          ))}
        </ul>
        <div>
          {!isFirstPageSection && (
            <FiChevronLeft onClick={() => setPageSection(pageSection - 1)} />
          )}
          {Array.from({
            length: Math.min(5, pagesNum - startNum + 1),
          }).map((_, i) => (
            <button key={i} onClick={() => setPage(i + 1)}>
              {i + startNum}
            </button>
          ))}
          {!isLastPageSection && (
            <FiChevronRight onClick={() => setPageSection(pageSection + 1)} />
          )}
        </div>
      </S_Wrapper>
    );
  }
}

export default Comments;

const S_Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  padding: 0 30px;
  & img {
    width: 26px;
    height: 26px;
    border-radius: 5px;
    margin-right: 10px;
  }
  > h1 {
    margin: 20px;
    display: flex;
    align-items: center;
  }
  > div:last-child {
    display: flex;
    justify-content: center;
    margin: 20px 0;
    > button {
      margin: 0 10px;
    }
  }
  & svg {
    font-size: 20px;
    margin: 10px 5px;
    color: var(--color-white-80);
  }
`;
