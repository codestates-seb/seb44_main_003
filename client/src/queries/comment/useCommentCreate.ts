import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PostComment } from '@/api/api';

const useCommentCreate = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(PostComment, {
    onSuccess: () => queryClient.invalidateQueries(['comments']),
  });
  return mutation;
};

export default useCommentCreate;
