import { useQuery } from '@tanstack/react-query';
import { GetUser } from '../../../api/api';
import { styled } from 'styled-components';

function Information() {
  const { isLoading, data, error, isSuccess } = useQuery({
    queryKey: ['user'],
    queryFn: GetUser,
    staleTime: 5 * 60 * 1000,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
  });
  if (isLoading) return <S_Wrapper>Loading..</S_Wrapper>;
  if (error instanceof Error)
    return <S_Wrapper>Error:{error.message}</S_Wrapper>;
  if (isSuccess) {
    const memberSince = new Date(data.createdAt);
    const currentDate = new Date();
    const timeDiff = currentDate.getTime() - memberSince.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return (
      <S_Wrapper>
        <h1>{data.nickname}</h1>
        <p>
          가입일 : {data.createdAt} | 조잉에 함께한 지 {daysDiff}일 째입니다
        </p>
        <div>
          <button type="button">프로필 변경</button>
          <button type="button">선호도 변경</button>
        </div>
      </S_Wrapper>
    );
  }
}

export default Information;

const S_Wrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0 30px;
  > h1 {
    font-size: 32px;
    font-weight: 700;
  }
  > p {
    font-size: 18px;
    color: var(--color-white-80);
  }
  > div {
    > button {
      width: 140px;
      height: 36px;
      border-radius: 5px;
      border: 1px solid #fff;
    }
    > button:first-child {
      margin-right: 40px;
    }
  }
`;
