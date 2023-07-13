import { useQuery } from '@tanstack/react-query';
import { GetUserReviews } from '../../../api/api';
// import CommentContent from '../../comments/CommentContent';
import noContent from '../../../assets/exception/nocontents.svg';
import { styled } from 'styled-components';

function ReviewList() {
  const { data, isSuccess } = useQuery(['userComments'], GetUserReviews);
  if (isSuccess) {
    console.log(data);
    if (!data.length)
      return (
        <S_Error>
          <img src={noContent} />
          <p>작성한 후기가 없습니다</p>
        </S_Error>
      );
    // return (
    //   <div>
    //     {data.map((review) => (
    //       <CommentContent comment={review} />
    //     ))}
    //   </div>
    // );
  }
}

export default ReviewList;

const S_Error = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  > p {
    margin-top: 20px;
  }
`;
