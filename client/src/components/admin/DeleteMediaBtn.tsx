import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AdminDeleteData } from '../../api/api';

function DeleteMediaBtn({ contentId }: { contentId: string }) {
  const navigate = useNavigate();
  const DeleteMediaMutation = useMutation(() => AdminDeleteData(contentId), {
    onSuccess: () => {
      alert('삭제 완료');
      navigate('/');
    },
  });

  const handleDelete = () => {
    const input = window.prompt(`삭제하려면 "${contentId} 삭제"를 입력하세요.`);
    if (input === `${contentId} 삭제`) {
      DeleteMediaMutation.mutate();
    } else {
      alert('삭제 취소');
    }
  };

  return (
    <>
      <S_DeleteBtn onClick={handleDelete}>삭제</S_DeleteBtn>
    </>
  );
}

export default DeleteMediaBtn;

const S_DeleteBtn = styled.button`
  position: absolute;
  top: 10%;
  right: 50px;
  width: 50px;
  height: 50px;
  background-color: white;
  border: 2px solid #000000;
  border-radius: 10px;
  z-index: 9999;
`;
