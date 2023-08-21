import { AiOutlineComment } from 'react-icons/ai';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { styled } from 'styled-components';
import CommentContent from '@/components/mediaDetail/comments/CommentContent';
import { COMMENTS_PER_PAGE, PAGES_PER_SECTION } from '@/constant/constantValue';
import { CommentData } from '@/types/types';

function Comments({
  data,
  page,
  setPage,
}: {
  data: CommentData;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) {
  const length = data.totalReviews;
  const pagesNum = Math.ceil(length / COMMENTS_PER_PAGE);
  const pageSection = Math.ceil(page / PAGES_PER_SECTION);
  const lastPageSection = Math.ceil(pagesNum / PAGES_PER_SECTION) || 1;
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
  & img {
    width: 26px;
    height: 26px;
    border-radius: 5px;
    margin-right: 10px;
  }
  & img.poster {
    width: 71px;
    height: 100px;
    border-radius: 5px;
    margin-right: 10px;
    cursor: pointer;
  }
  > h1 {
    margin: 20px 0;
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
    transition: color 0.3s ease;
    &:hover {
      color: white;
    }
    @media only screen and (max-width: 480px) {
      font-size: 15px;
    }
  }
`;

const S_Button = styled.button<{ $isSelected: boolean }>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  color: ${(props) =>
    props.$isSelected ? 'var(--color-bg-100)' : 'var(--color-white-80)'};
  background-color: ${(props) => (props.$isSelected ? 'white' : undefined)};
  transition: color 0.3s ease;
  &:hover {
    color: ${(props) => (props.$isSelected ? undefined : 'white')};
  }
`;
