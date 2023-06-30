import { styled } from 'styled-components';
import MainLogo from './MainLogo';
import Navigation from './Navigation';
import MemberMenu from './MemberMenu';
import SearchBar from './SearchBar';
import useMediaQuery from '../../hooks/useMediaQuery';

function Header() {
  const isDesktop = useMediaQuery('(min-width: 940px)');
  return (
    <S_Header>
      <S_Wrapper $primary={isDesktop}>
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

const S_Header = styled.header`
  display: flex;
  justify-content: center;
  padding: 0 20px;
  height: 90px;
  width: 100%;
  top: 0;
  position: sticky;
  background: linear-gradient(
    180deg,
    rgba(20, 24, 31, 0.49) 0%,
    rgba(20, 24, 31, 0) 100%
  );
`;

const S_Wrapper = styled.div<{ $primary: boolean }>`
  max-width: 1500px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  height: 90px;
  width: 100%;

  > div {
    display: flex;
    flex-direction: row;
  }
  > :nth-child(2) {
    flex-grow: 1;
    justify-content: flex-end;
    margin-left: ${(props) => (props.$primary ? '60px' : '0')};
  }
`;
