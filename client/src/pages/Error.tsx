import { styled } from 'styled-components';
import error from '../assets/error.webp';

function NotFound() {
  return (
    <div>
      <h1>404 Not Found</h1>
      <p>페이지를 찾을 수 없습니다.</p>
      <a href="/">홈으로 가기</a>
    </div>
  );
}

function ServerError() {
  return (
    <div>
      <h1>Internal server error</h1>
      <p>일시적인 서버 장애로 페이지를 로드할 수 없습니다.</p>
      <p>잠시 뒤에 다시 시도해주세요.</p>
    </div>
  );
}

function Error({ code }: { code: string }) {
  return (
    <S_Wrapper>
      <img src={error} />
      {code === '404' ? <NotFound /> : <ServerError />}
    </S_Wrapper>
  );
}

export default Error;

const S_Wrapper = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: white;
  > img {
    width: 300px;
  }
  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    > h1 {
      font-size: 30px;
      margin-bottom: 15px;
    }
    > p {
      font-size: 20px;
      line-height: 1.5;
    }
    > a {
      margin-top: 15px;
      font-size: 18px;
      color: var(--color-white-80);
      text-decoration: underline;
    }
    > a:hover {
      color: white;
    }
  }
`;
