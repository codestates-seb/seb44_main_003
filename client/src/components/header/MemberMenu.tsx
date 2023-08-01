import { styled } from 'styled-components';
import useIsLoggedIn from '../../hooks/useIsLoggedIn';
import UserProfile from './UserProfile';
import LoginSignup from './LoginSignup';

function MemberMenu({ position }: { position: number }) {
  const isLoggedIn = useIsLoggedIn();
  return (
    <S_Nav>
      {isLoggedIn ? <UserProfile /> : <LoginSignup position={position} />}
    </S_Nav>
  );
}

export default MemberMenu;

const S_Nav = styled.nav`
  display: flex;
  align-items: center;
  height: 100%;
`;
