import styled from 'styled-components';

const ModalHover = () => {
  return (
    <ModalOverlay>
      <Modal></Modal>
    </ModalOverlay>
  );
};

export default ModalHover;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9998;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  display: flex;
  justify-content: flex-end;
  position: fixed;
  top: 45%;
  left: 50%;
  width: 750px;
  height: 450px;
  border-radius: 8px;
  z-index: 9999;
  transform: translate(-50%, -50%);
  box-shadow: 0 0px 200px 1px rgb(255, 255, 255);
`;
