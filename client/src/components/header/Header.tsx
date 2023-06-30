import { styled } from 'styled-components';
import MainLogo from './MainLogo';
import Navigation from './Navigation';
import MemberMenu from './MemberMenu';
import SearchBar from './SearchBar';

function Header() {
  return (
    <S_Header>
      <div>
        <MainLogo />
        <Navigation />
      </div>
      <div>
        <SearchBar />
        <MemberMenu />
      </div>
    </S_Header>
  );
}

export default Header;

const S_Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 60px;
  height: 90px;
  width: 100%;
  top: 0;
  position: sticky;
  background: linear-gradient(
    180deg,
    rgba(20, 24, 31, 0.49) 0%,
    rgba(20, 24, 31, 0) 100%
  );

  > div {
    display: flex;
    flex-direction: row;
  }
`;
