import { IoMdClose } from 'react-icons/io';
import styled from 'styled-components';
import gif from '../../assets/gif/1.gif';

interface ModalHoverProps {
  handleModalClose: () => void;
}

const ModalHover: React.FC<ModalHoverProps> = ({ handleModalClose }) => {
  const handleOverlayClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) {
      handleModalClose();
    }
  };

  return (
    <S_Modal onMouseLeave={handleOverlayClose}>
      <S_Close size="24" onClick={handleModalClose} />
      <img src={gif} alt="gif" />
      <div>원펀맨 상세페이지로 이동</div>
    </S_Modal>
  );
};

export default ModalHover;

const S_Modal = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 750px;
  height: 500px;
  border-radius: 8px;
  z-index: 1;
  background-color: var(--color-bg-100);

  div {
    position: absolute;
    border-radius: 5px;
    bottom: 2%;
    left: 2%;
    background-color: var(--color-white-60);
    padding: 4px 8px;
    cursor: pointer;
  }
  div:hover {
    background-color: var(--color-white-100);
    transition: background-color 0.5s ease-in-out;
  }
`;

const S_Close = styled(IoMdClose)`
  position: absolute;
  top: 2%;
  right: 2%;
  color: white;
  cursor: pointer;
`;
