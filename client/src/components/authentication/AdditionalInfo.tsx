function AdditionalInfo({ isLoginPage }: { isLoginPage: boolean }) {
  if (isLoginPage)
    return (
      <div>
        회원이 아니신가요? <a href="/signup">회원가입하기</a>
      </div>
    );
  else
    return (
      <div>
        이미 회원이신가요? <a href="login">로그인하기</a>
      </div>
    );
}

export default AdditionalInfo;
