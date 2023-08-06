import { useEffect } from 'react';
import styled from 'styled-components';
import { useModal } from '@/hooks/useModal';

function Modal() {
  const { modalDataState, closeModal } = useModal();

  useEffect(() => {
    if (!modalDataState.isOpen) {
      return;
    }
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [modalDataState.isOpen]);

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      {modalDataState.isOpen && (
        <ModalDimmer onClick={handleClose}>
          <ModalContents>{modalDataState.content}</ModalContents>
        </ModalDimmer>
      )}
    </>
  );
}

export default Modal;

const ModalDimmer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;
const ModalContents = styled.div`
  padding: 1rem;
`;
