import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PostMember, Login } from '@/api/api';
import { NewMember } from '@/types/types';
import { LoginInfo } from '@/types/types';
import { notifyWithIcon } from '@/utils/notify';
import { validateTokens } from '@/utils/validateTokens';

const useMemberCreate = (nickname: string, email: string, password: string) => {
  const navigate = useNavigate();
  const loginMutation = useMutation({
    mutationFn: (member: LoginInfo) => Login(member),
    onSuccess(data) {
      if (data.status === 200) {
        validateTokens(data.headers.authorization, data.headers.refresh);
        navigate('/');
      }
    },
  });
  const [mutationError, setMutationError] = useState<string | null>(null);
  const signupMutation = useMutation({
    mutationFn: (newMember: NewMember) => PostMember(newMember),
    onSuccess(data) {
      if (data.status === 201) {
        notifyWithIcon(`${nickname}님 JOYING에 오신 걸 환영합니다!`, '🎉');
        loginMutation.mutate({ email, password });
      }
    },
    onError(error: AxiosError) {
      if (error.response && error.response.status === 409) {
        setMutationError('이미 사용 중인 이메일입니다.');
        console.error('error:  with same data already exist.');
      } else {
        console.error('error:', error);
      }
    },
  });
  return { signupMutation, mutationError };
};

export default useMemberCreate;
