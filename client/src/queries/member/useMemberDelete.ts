import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { DeleteMember } from '@/api/api';
import { notifyWithIcon } from '@/utils/notify';

const useMemberDelete = () => {
  const navigate = useNavigate();
  const mutation = useMutation(DeleteMember, {
    onSuccess: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('expiration');
      localStorage.removeItem('refresh');
      navigate('/');
      notifyWithIcon('JOYING은 이 일을 기억할 것입니다.', '🥲');
    },
  });
  return mutation;
};

export default useMemberDelete;
