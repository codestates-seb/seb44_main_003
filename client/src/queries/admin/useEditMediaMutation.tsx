import { useMutation } from '@tanstack/react-query';
import { AdminPatchData } from '@/api/api';

const useEditMediaMutation = () => {
  const editMediaMutation = useMutation({
    mutationFn: AdminPatchData,
    onSuccess: () => {
      alert('수정 완료');
      window.location.reload();
    },
  });
  return editMediaMutation;
};

export default useEditMediaMutation;
