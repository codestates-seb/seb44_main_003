import { styled } from 'styled-components';

function AdditionalInfo({ isLoginPage }: { isLoginPage: boolean }) {
  if (isLoginPage)
    return (
      <div>
        회원이 아니신가요? <S_Link href="/signup">회원가입하기</S_Link>
      </div>
    );
  else
    return (
      <div>
        이미 회원이신가요? <S_Link href="login">로그인하기</S_Link>
      </div>
    );
}

export default AdditionalInfo;

const S_Link = styled.a`
  transition: color 0.3s ease;
  &:hover {
    color: white;
  }
`;
