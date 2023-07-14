import { styled } from 'styled-components';
import { useModal } from '../../hooks/useModal';
import ReportModal from '../ui/modal/ReportModal';

const ReportBtn = ({ contentId }: { contentId: string }) => {
  const { openModal } = useModal();

  const modalData = {
    content: <ReportModal contentId={contentId} />,
  };

  return (
    <>
      <S_Button onClick={() => openModal(modalData)}>오류 제보하기</S_Button>
    </>
  );
};

export default ReportBtn;

const S_Button = styled.button`
  width: 277px;
  height: 30px;
  margin-top: 5px;
  border-radius: 5px;
  border: 1px solid var(--color-white-80);
  color: var(--color-white-80);
  font-weight: 300;
  background-color: #d9d9d933;
  backdrop-filter: blur(3px);
  transition: all 0.3s ease;
  &:hover {
    border: 1px solid rgba(255, 0, 0, 0.7);
    background-color: #ff00004d;
    color: white;
  }
`;
