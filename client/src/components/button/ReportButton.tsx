import { styled } from 'styled-components';
import ReportModal from '@/components/modal/ReportModal';
import useIsLoggedIn from '@/hooks/useIsLoggedIn';
import { useModal } from '@/hooks/useModal';
import { notifyError } from '@/utils/notify';

function ReportButton({ contentId }: { contentId: string }) {
  const { openModal } = useModal();
  const isLoggedIn = useIsLoggedIn();

  const modalData = {
    content: <ReportModal contentId={contentId} />,
  };

  const handleModalOpen = () => {
    if (isLoggedIn) {
      openModal(modalData);
    } else {
      notifyError('로그인 후 이용 가능합니다');
    }
  };

  return (
    <>
      <S_Button onClick={handleModalOpen}>오류 제보하기</S_Button>
    </>
  );
}

export default ReportButton;

const S_Button = styled.button`
  width: 277px;
  height: 50px;
  margin: 10px 0;
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
