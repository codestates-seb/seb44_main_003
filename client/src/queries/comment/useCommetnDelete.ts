import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DeleteComment } from '@/api/api';

const useCommentDelete = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(DeleteComment, {
    onSuccess: () => queryClient.invalidateQueries(['comments']),
  });
  return mutation;
};

export default useCommentDelete;
