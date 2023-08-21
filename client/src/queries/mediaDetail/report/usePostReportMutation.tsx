import { useMutation } from '@tanstack/react-query';
import { PostReport } from '@/api/api';
import { useModal } from '@/hooks/useModal';
import { notifySuccess } from '@/utils/notify';

const usePostReportMutation = () => {
  const { closeModal } = useModal();
  const postReportMutation = useMutation({
    mutationFn: PostReport,
    onSuccess: () => {
      notifySuccess('제보가 접수되었습니다.');
      closeModal();
    },
  });
  return postReportMutation;
};

export default usePostReportMutation;
