import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PostBookmark } from '@/api/api';
import { notifyWithIcon } from '@/utils/notify';

const useBookmarkMutation = (contentId: string, data: boolean) => {
  const queryClient = useQueryClient();
  const bookmarkMutation = useMutation({
    mutationFn: () => PostBookmark(contentId),
    onSuccess: () => {
      if (!data) {
        notifyWithIcon('찜 완료!', '❤️');
      } else {
        notifyWithIcon('찜 취소..', '🤍');
      }
      queryClient.invalidateQueries(['isBookmarked', contentId]);
      queryClient.invalidateQueries(['userContents']);
    },
  });
  return bookmarkMutation;
};

export default useBookmarkMutation;
