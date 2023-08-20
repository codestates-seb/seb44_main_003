import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PatchMember } from '@/api/api';

const useMemberMutation = (callback?: () => void) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(PatchMember, {
    onSuccess: () => {
      if (callback) callback();
      queryClient.invalidateQueries(['member']);
    },
  });
  return mutation;
};

export default useMemberMutation;
