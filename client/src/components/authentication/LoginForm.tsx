import { useState } from 'react';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { HiXCircle } from 'react-icons/hi';
import { useMutation } from '@tanstack/react-query';
import { Login } from '../../api/api';
import { LoginInfo } from '../../types/types';
import { AxiosError } from 'axios';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
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

  const mutation = useMutation({
    mutationFn: (member: LoginInfo) => Login(member),
    onSuccess(data) {
      if (data.status === 200) {
        const accessToken = data.headers.authorization;
        const refreshToken = data.headers.refresh;
        if (accessToken) {
          localStorage.setItem('token', accessToken);
          const expiration = new Date();
          expiration.setMinutes(expiration.getMinutes() + 1);
          localStorage.setItem('expiration', expiration.toISOString());
        }
        if (refreshToken) {
          localStorage.setItem('refresh', refreshToken);
        }
        window.location.href = `${import.meta.env.VITE_CLIENT_URL}`;
      }
    },
    onError(error: AxiosError) {
      if (error.response && error.response.status === 401) {
        setLoginError(
          '로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.'
        );
        console.error('error:  with same data already exist.');
      } else {
        console.error('error:', error);
      }
    },
  });
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
      <button type="submit">로그인하기</button>
    </form>
  );
}

export default LoginForm;
