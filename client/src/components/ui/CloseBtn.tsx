import { IoClose } from 'react-icons/io5';
import styled from 'styled-components';

interface CloseBtnProps {
  onClick: () => void;
}

const CloseBtn: React.FC<CloseBtnProps> = ({ onClick }) => {
  return (
    <>
      <S_Close onClick={onClick} />
    </>
  );
};

export default CloseBtn;

const S_Close = styled(IoClose)`
  position: absolute;
  top: 15%;
  right: 5%;
  color: var(--color-white-100);
  font-size: 50px;
  cursor: pointer;

  @media only screen and (max-width: 1200px) {
    font-size: 50px;
  }

  @media only screen and (max-width: 770px) {
    font-size: 40px;
  }

  @media only screen and (max-width: 480px) {
    font-size: 30px;
  }
`;
