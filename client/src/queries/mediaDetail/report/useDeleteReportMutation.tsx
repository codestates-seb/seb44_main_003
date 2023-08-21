import { useMutation } from '@tanstack/react-query';
import { DeleteReport } from '@/api/api';

const useDeleteReportMutation = () => {
  const deleteReportMutation = useMutation(DeleteReport, {
    onSuccess: () => {
      alert('삭제 완료');
      window.location.reload();
    },
  });
  return deleteReportMutation;
};

export default useDeleteReportMutation;
