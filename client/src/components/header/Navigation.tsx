import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const navMenus = [
  { text: 'TV', route: '/tv' },
  { text: '영화', route: '/movie' },
  { text: '추천해조잉', route: '/recommend' },
];

function Navigation() {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  return (
    <StyledNav>
      {navMenus.map((menu) => (
        <S_Heading
          key={menu.text}
          onClick={() => navigate(menu.route)}
          $isSelected={pathname === menu.route}
        >
          {menu.text}
        </S_Heading>
      ))}
    </StyledNav>
  );
}

export default Navigation;

const StyledNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 250px;
  @media only screen and (max-width: 940px) {
    position: absolute;
    top: 90px;
    left: 40px;
  }

  > h1 {
    font-weight: 700;
    text-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
`;

const S_Heading = styled.h1<{ $isSelected: boolean }>`
  color: ${(props) => (props.$isSelected ? ' #FF0' : 'white')};
`;
