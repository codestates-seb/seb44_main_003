import styled from 'styled-components';

const ModalHover = () => {
  return (
    <ModalOverlay>
      <Modal></Modal>
    </ModalOverlay>
  );
};

export default ModalHover;

const ModalOverlay = styled.div``;

const Modal = styled.div``;
