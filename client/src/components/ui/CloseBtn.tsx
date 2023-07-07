import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';

const CloseBtn = () => {
  return (
    <>
      <S_Close/>
    </>
  )
}

export default CloseBtn

const S_Close = styled(IoClose)`
  position: absolute;
  top: 5%;
  right: 0%;
  color: var(--color-white-100);
  font-size: 50px;
  cursor: pointer;
`;