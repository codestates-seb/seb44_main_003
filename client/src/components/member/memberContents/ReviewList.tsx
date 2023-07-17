import { useQuery } from '@tanstack/react-query';
import { GetUserReviews } from '../../../api/api';
import CommentContent from '../../comments/CommentContent';
import noContent from '../../../assets/exception/nocontents.svg';
import { styled } from 'styled-components';

function ReviewList() {
  const { data, isSuccess } = useQuery(['comments'], GetUserReviews);
  if (isSuccess) {
    if (!data.reviews.length)
      return (
        <S_Error>
          <img src={noContent} />
          <p>작성한 후기가 없습니다</p>
        </S_Error>
      );
    return (
      <S_Wrapper>
        {data.reviews.map((review) => (
          <>
            <a href={`/content/${review.media?.mediaId}`}>
              {review.media ? review.media.title : ''}
            </a>
            <CommentContent key={review.id} comment={review} />
          </>
        ))}
      </S_Wrapper>
    );
  }
}

export default ReviewList;

const S_Error = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px 0;
  > p {
    margin-top: 20px;
  }
`;

const S_Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  color: white;
  margin: 50px 0;
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
  & a {
    text-decoration: underline;
    font-size: 18px;
  }
`;
