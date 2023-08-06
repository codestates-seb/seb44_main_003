import { useState } from 'react';
import styled from 'styled-components';
import AdminMediaForm from '@/components/admin/AdminMediaForm';
import { SelectedData } from '@/types/types';

function PatchMediaBtn({
  editData,
  contentId,
}: {
  editData: SelectedData;
  contentId: string;
}) {
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  return (
    <>
      {isEdit && (
        <AdminMediaForm type="edit" editData={editData} contentId={contentId} />
      )}
      <S_DeleteBtn onClick={handleEdit}>{isEdit ? '취소' : '수정'}</S_DeleteBtn>
    </>
  );
}

export default PatchMediaBtn;

const S_DeleteBtn = styled.button`
  position: absolute;
  top: 10%;
  right: 120px;
  width: 50px;
  height: 50px;
  background-color: white;
  border: 2px solid #000000;
  border-radius: 10px;
  z-index: 9999;
`;
