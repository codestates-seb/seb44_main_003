import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Login } from '@/api/api';
import { REFRESH_TOKEN_DURATION } from '@/constant/constantValue';
import { LoginInfo } from '@/types/types';
import { validateTokens } from '@/utils/validateTokens';

const useMemberLogin = () => {
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (member: LoginInfo) => Login(member),
    onSuccess(data) {
      if (data.status === 200) {
        validateTokens(data.headers.authorization, data.headers.refresh);
        const expiration = new Date();
        expiration.setMinutes(expiration.getMinutes() + REFRESH_TOKEN_DURATION);
        localStorage.setItem('expiration', expiration.toISOString());
        navigate('/');
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

  return { mutation, loginError };
};

export default useMemberLogin;
