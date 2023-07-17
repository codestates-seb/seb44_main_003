import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';

interface CloseBtnProps {
  onClick: () => void;
}

const CloseBtn: React.FC<CloseBtnProps> = ({ onClick }) => {
  return (
    <>
      <S_Close onClick={onClick}/>
    </>
  )
}

export default CloseBtn

const S_Close = styled(IoClose)`
  position: absolute;
  top: 15%;
  right: 0%;
  color: var(--color-white-100);
  font-size: 50px;
  cursor: pointer;
`;