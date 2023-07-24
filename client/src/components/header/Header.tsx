import { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import MainLogo from './MainLogo';
import Navigation from './Navigation';
import MemberMenu from './MemberMenu';
import SearchBar from './SearchBar';
import useMediaQuery from '../../hooks/useMediaQuery';
import { FiSearch } from 'react-icons/fi';
import { useModal } from '../../hooks/useModal';

function Header() {
  const [position, setPosition] = useState(window.scrollY);
  const [visible, setVisible] = useState(true);
  const { openModal } = useModal();
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    const handleScroll = () => {
      const moving = window.scrollY;
      setVisible(position < 400 || position > moving);
      setPosition(moving);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [position]);
  const handleClick = () => {
    openModal({ content: <SearchBar /> });
  };

  return (
    <S_Header $visible={visible}>
      <S_Wrapper>
        <div>
          <MainLogo />
          <Navigation />
        </div>
        <div>
          {isMobile || (
            <S_Logo onClick={handleClick}>
              <FiSearch />
            </S_Logo>
          )}
          <MemberMenu position={position} />
        </div>
      </S_Wrapper>
    </S_Header>
  );
}

export default Header;

const S_Header = styled.header<{ $visible: boolean }>`
  transform: ${(props) => (props.$visible ? undefined : 'translate(0, -80px)')};
  display: flex;
  justify-content: center;
  width: 100%;
  top: 0;
  position: sticky;
  z-index: 1000;
  transition: transform 0.5s ease;
`;
const S_Wrapper = styled.div`
  position: absolute;
  max-width: 1500px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 60px 0 60px;
  width: 100%;
  background: linear-gradient(
    180deg,
    rgba(20, 24, 31, 0.49) 0%,
    rgba(20, 24, 31, 0) 100%
  );
  > div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  > :nth-child(2) {
    flex-grow: 1;
    justify-content: flex-end;
    margin-left: 60px;
    @media only screen and (max-width: 940px) {
      margin-left: 0;
    }
  }

  @media only screen and (max-width: 770px) {
    padding: 15px 20px 0 20px;
  }
`;
const S_Logo = styled.button`
  color: var(--color-white-60);
  font-size: 20px;
  right: 8px;
  transition: color 0.3s ease;
  &:hover {
    color: white;
  }
`;
