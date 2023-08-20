import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { PatchComment } from '@/api/api';

const useCommentMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(PatchComment, {
    onSuccess: () => queryClient.invalidateQueries(['comments']),
  });
  return mutation;
};

export default useCommentMutation;
