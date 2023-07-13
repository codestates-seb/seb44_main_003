import { useMutation } from '@tanstack/react-query';
import styled from 'styled-components';
import { AdminDeleteData } from '../../api/api';

const DeleteMedia = ({ contentId }: { contentId: string }) => {
  const DeleteMediaMutation = useMutation(() => AdminDeleteData(contentId), {
    onSuccess: () => alert('삭제 완료'),
  });

  const handledelete = () => {
    const input = window.prompt(`삭제하려면 "${contentId} 삭제"를 입력하세요.`);
    if (input === `${contentId} 삭제`) {
      DeleteMediaMutation.mutate();
    } else {
      alert('삭제 취소');
    }
  };

  return (
    <>
      <S_DeleteBtn onClick={handledelete}>삭제</S_DeleteBtn>
    </>
  );
};

export default DeleteMedia;

const S_DeleteBtn = styled.button`
  position: absolute;
  top: 10%;
  right: 10%;
  width: 50px;
  height: 50px;
  background-color: white;
  border: 2px solid #000000;
  border-radius: 10px;
`;