import { useState } from 'react';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { HiXCircle } from 'react-icons/hi';

import Button from '@/components/@common/button/Button';

import useMemberLogin from '@/queries/member/useMemberLogin';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  function checkEmail() {
    const emailRegexp = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    if (!email) {
      setEmailError('이메일을 입력해주세요.');
      return false;
    }
    if (!emailRegexp.test(email)) {
      setEmailError('유효하지 않은 이메일 주소입니다.');
      return false;
    }
    setEmailError(null);
    return true;
  }

  function checkuserPassword() {
    if (!password) {
      setPasswordError('비밀번호를 입력해주세요.');
      return false;
    }
    setPasswordError(null);
    return true;
  }

  function validate() {
    return checkEmail() && checkuserPassword();
  }
  const { mutation, loginError } = useMemberLogin();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      mutation.mutate({ email, password });
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="email">이메일</label>
        <input
          name="email"
          type="text"
          onChange={handleEmail}
          value={email}
          className={emailError ? 'error' : undefined}
        />
        <HiXCircle onClick={() => setEmail('')} />
      </div>
      {emailError && <div className="error">{emailError}</div>}
      <div>
        <label htmlFor="password">비밀번호</label>
        <input
          name="password"
          type={showPassword ? 'text' : 'password'}
          onChange={handlePassword}
          className={passwordError ? 'error' : undefined}
        />
        {showPassword ? (
          <BsEyeFill onClick={() => setShowPassword(false)} />
        ) : (
          <BsEyeSlashFill onClick={() => setShowPassword(true)} />
        )}
      </div>
      {passwordError && <div className="error">{passwordError}</div>}
      {loginError && <div className="error">{loginError}</div>}
      <Button type="submit" variant="primary">
        로그인하기
      </Button>
    </form>
  );
}

export default LoginForm;
