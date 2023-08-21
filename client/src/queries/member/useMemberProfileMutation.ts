import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { PostMemberProfile } from '@/api/api';
import { profileModalState } from '@/recoil/atoms/Atoms';

const useMemberProfileMutation = () => {
  const setShowModal = useSetRecoilState(profileModalState);
  const queryClient = useQueryClient();
  const mutation = useMutation(PostMemberProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries(['member']);
      setShowModal(false);
    },
  });
  return mutation;
};

export default useMemberProfileMutation;
