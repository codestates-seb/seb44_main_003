import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { PostUserProfile } from '../../../api/api';

function ImgUpload() {
  const queryClient = useQueryClient();
  const [imgState, setImgState] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);
  const mutation = useMutation(PostUserProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries(['user']);
    },
  });
  const checkFileVaildity = (file: File) => {
    const maxSize = 1024 * 1024 * 20; //최대 용량 확인 필요(현재 20mb)
    if (file.size > maxSize) {
      setError('최대 용량을 초과했습니다.');
      return false;
    }
    return true;
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    checkFileVaildity(file);
    setImgState(file);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    if (imgState) data.append('file', imgState);
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} name="img" type="file" accept="image/*" />
      <button type="submit">확인</button>
    </form>
  );
}

export default ImgUpload;
