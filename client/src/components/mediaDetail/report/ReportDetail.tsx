import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { useModal } from '@/hooks/useModal';
import useDeleteReportMutation from '@/queries/mediaDetail/report/useDeleteReportMutation';
import { Report } from '@/types/types';

function ReportDetail({ data }: { data: Report }) {
  const { closeModal } = useModal();
  const navigate = useNavigate();

  const handleNavigate = () => {
    closeModal();
    navigate(`/content/${data.mediaId}`);
  };

  const DeleteReportMutation = useDeleteReportMutation();

  const handleDelete = () => {
    const input = window.prompt(`삭제하려면 "${data.id}을/를 입력하세요.`);
    if (input === `${data.id}`) {
      DeleteReportMutation.mutate(String(data.id));
    } else {
      alert('삭제 취소');
    }
  };

  return (
    <S_Wrapper>
      <S_TextBox>
        <h1>Title: {data.title}</h1>
        <h1>ID: {data.id}</h1>
        <h1>MediaID: {data.mediaId}</h1>
        <h1>Completion: {data.completion ? 'True' : 'False'}</h1>
        <S_NavigateButton onClick={handleNavigate}>이동</S_NavigateButton>
      </S_TextBox>
      <S_ContentBox>
        <h1>Content: {data.content}</h1>
        <div>
          <S_Button onClick={() => handleDelete()}>삭제</S_Button>
          <S_Button onClick={() => closeModal()}>닫기</S_Button>
        </div>
      </S_ContentBox>
    </S_Wrapper>
  );
}

export default ReportDetail;

const S_Wrapper = styled.div`
  width: 600px;
  height: 400px;
  display: flex;
  padding: 5px;
  border-radius: 5px;
  border: 3px solid var(--color-primary-gold);
  background-color: var(--color-bg-100);
  color: var(--color-white-100);
  border-radius: 10px;
`;

const S_TextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 1px solid var(--color-white-100);
  padding: 10px;
  border-radius: 5px;
`;

const S_ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 10px;

  h1 {
    flex-grow: 1;
  }

  div {
    display: flex;
    justify-content: space-evenly;
  }
`;

const S_NavigateButton = styled.button`
  width: 100px;
  height: 50px;
  border-radius: 5px;
  border: 1px solid var(--color-white-80);
  color: var(--color-white-80);
  background-color: #d9d9d933;
  backdrop-filter: blur(3px);
  transition: all 0.3s ease;
  &:hover {
    background-color: var(--color-white-60);
    border: 1px solid white;
    color: white;
  }
`;

const S_Button = styled.button`
  width: 100px;
  height: 50px;
  border-radius: 5px;
  border: 1px solid var(--color-white-80);
  color: var(--color-white-80);
  background-color: #d9d9d933;
  backdrop-filter: blur(3px);
  transition: all 0.3s ease;
  &:hover {
    background-color: var(--color-white-60);
    border: 1px solid white;
    color: white;
  }
`;
