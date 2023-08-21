import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PostRecommend } from '@/api/api';
import { notifyWithIcon } from '@/utils/notify';

const useRecommendMutation = (contentId: string, data: boolean) => {
  const queryClient = useQueryClient();
  const recommendMutation = useMutation({
    mutationFn: () => PostRecommend(contentId),
    onSuccess: () => {
      if (!data) {
        notifyWithIcon('추천 완료!', '👍🏼');
      } else {
        notifyWithIcon('추천 취소..', '👎🏼');
      }
      queryClient.invalidateQueries(['isRecommend', contentId]);
      queryClient.invalidateQueries(['selectedContent', contentId]);
      queryClient.invalidateQueries(['userContents']);
    },
  });
  return recommendMutation;
};

export default useRecommendMutation;
