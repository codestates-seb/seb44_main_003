import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { AdminDeleteData } from '@/api/api';

const useDeleteMediaMutation = () => {
  const navigate = useNavigate();
  const deleteMediaMutation = useMutation(
    (contentId: string) => AdminDeleteData(contentId),
    {
      onSuccess: () => {
        alert('삭제 완료');
        navigate('/');
      },
    }
  );
  return deleteMediaMutation;
};

export default useDeleteMediaMutation;
