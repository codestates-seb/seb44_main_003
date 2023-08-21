import { useMutation } from '@tanstack/react-query';
import { AdminPostData } from '@/api/api';
import { AddData } from '@/types/types';

const useAddMediaMutation = () => {
  const AddMediaMutation = useMutation(
    (convertedData: AddData) => {
      return AdminPostData(convertedData);
    },
    {
      onSuccess: () => {
        alert('등록 완료');
        window.location.reload();
      },
    }
  );

  return AddMediaMutation;
};

export default useAddMediaMutation;
