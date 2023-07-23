import { styled } from 'styled-components';
import { HiOutlineChevronUp } from 'react-icons/hi';

function TopButton() {
  return (
    <S_Button
      type="button"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      }
    >
      <HiOutlineChevronUp />
      Top
    </S_Button>
  );
}

export default TopButton;

const S_Button = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  z-index: 9999;
  position: fixed;
  bottom: 60px;
  right: 60px;
  background-color: var(--color-white-60);
  color: var(--color-bg-100);
  border-radius: 50%;
`;
