import { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import MainLogo from './MainLogo';
import Navigation from './Navigation';
import MemberMenu from './MemberMenu';
import SearchBar from './SearchBar';

function Header() {
  const [position, setPosition] = useState(window.scrollY);
  const [visible, setVisible] = useState(true);

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

  return (
    <S_Header $visible={visible}>
      <S_Wrapper>
        <div>
          <MainLogo />
          <Navigation />
        </div>
        <div>
          <SearchBar />
          <MemberMenu />
        </div>
      </S_Wrapper>
    </S_Header>
  );
}

export default Header;

const S_Header = styled.header<{ $visible: boolean }>`
  transform: ${(props) =>
    props.$visible ? undefined : 'translate(0, -120px)'};
  display: flex;
  justify-content: center;
  width: 100%;
  top: 0;
  position: sticky;
  background: linear-gradient(
    180deg,
    rgba(20, 24, 31, 0.49) 0%,
    rgba(20, 24, 31, 0) 100%
  );
  z-index: 1000;
  transition: transform 0.5s ease;
`;

const S_Wrapper = styled.div`
  margin-top: 15px;
  position: absolute;
  max-width: 1500px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 60px 0 43px;
  width: 100%;

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

  @media only screen and (max-width: 540px) {
    padding: 0 20px 0 3px;
  }
`;
