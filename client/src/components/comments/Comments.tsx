import { styled } from 'styled-components';
import CommentContent from './CommentContent';
import { AiOutlineComment } from 'react-icons/ai';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import {
  COMMENTS_PER_PAGE,
  PAGES_PER_SECTION,
} from '../../constant/constantValue';
import { CommentData } from '../../types/types';

function Comments({
  data,
  page,
  setPage,
}: {
  data: CommentData;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) {
  //전체 후기 수
  const length = data.totalReviews;
  //총 페이지 숫자
  const pagesNum = Math.ceil(length / COMMENTS_PER_PAGE);
  //현재 페이지섹션
  const pageSection = Math.ceil(page / PAGES_PER_SECTION);
  //마지막 페이지 섹션
  const lastPageSection = Math.ceil(pagesNum / PAGES_PER_SECTION) || 1;
  //현재 페이지 섹션에서 보여질 첫 페이지 숫자
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
          <CommentContent key={comment.id} comment={comment} />
        ))}
      </ul>
      <div>
        {!isFirstPageSection && (
          <FiChevronLeft
            onClick={() => {
              setPage(Math.max(startNum - PAGES_PER_SECTION, 1));
            }}
          />
        )}
        {Array.from({
          length: Math.min(5, pagesNum - startNum + 1),
        }).map((_, i) => (
          <S_Button
            key={i}
            onClick={() => setPage(i + startNum)}
            $isSelected={page === i + startNum}
          >
            {i + startNum}
          </S_Button>
        ))}
        {!isLastPageSection && (
          <FiChevronRight
            onClick={() => {
              setPage(startNum + PAGES_PER_SECTION);
            }}
          />
        )}
      </div>
    </S_Wrapper>
  );
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
    align-items: center;
    justify-content: center;
    margin: 20px 0;
    > button {
      margin: 0 5px;
    }
  }
  & svg {
    font-size: 23px;
    margin: 10px 5px;
    color: var(--color-white-80);
    cursor: pointer;
  }
`;

const S_Button = styled.button<{ $isSelected: boolean }>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  color: ${(props) => (props.$isSelected ? 'var(--color-bg-100)' : undefined)};
  background-color: ${(props) => (props.$isSelected ? 'white' : undefined)};
`;
