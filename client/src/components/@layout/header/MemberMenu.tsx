import { styled } from 'styled-components';
import LoginSignup from '@/components/@layout/header/LoginSignup';
import UserProfile from '@/components/@layout/header/MemberProfile';
import checkLogin from '@/utils/checkLogin';

function MemberMenu({ position }: { position: number }) {
  const isLoggedIn = checkLogin();
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
