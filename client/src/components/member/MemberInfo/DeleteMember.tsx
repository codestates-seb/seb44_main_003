import { styled } from 'styled-components';
import { useMutation } from '@tanstack/react-query';
import { DeleteUser } from '../../../api/api';

function DeleteMember() {
  const mutationDelete = useMutation({
    mutationFn: DeleteUser,
  });

  const handleDelete = () => {
    const confirm = window.confirm(
      '정말로 회원 정보를 모두 삭제하시겠습니까? 삭제 후에는 복구가 불가능합니다.'
    );
    confirm && mutationDelete.mutate();
  };

  return (
    <S_Wrapper>
      <button type="button" onClick={handleDelete}>
        회원 탈퇴
      </button>
    </S_Wrapper>
  );
}

export default DeleteMember;

const S_Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  > button {
    width: 140px;
    height: 36px;
    border-radius: 5px;
    border: 1px solid #fff;
    margin-bottom: 12px;
  }
`;
