import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '../../hooks/useMediaQuery';

const navMenus = [
  { text: 'TV', route: '/tv' },
  { text: '영화', route: '/movie' },
  { text: '추천해조잉', route: '/recommend' },
];

function Navigation() {
  const isDesktop = useMediaQuery('(min-width: 940px)');
  const navigate = useNavigate();
  return (
    <StyledNav $primary={isDesktop}>
      {navMenus.map((menu) => (
        <span onClick={() => navigate(menu.route)}>{menu.text}</span>
      ))}
    </StyledNav>
  );
}

export default Navigation;

const StyledNav = styled.nav<{ $primary: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 250px;
  position: ${(props) => (props.$primary ? 'static' : 'absolute')};
  top: ${(props) => (props.$primary ? undefined : '90px')};
  left: ${(props) => (props.$primary ? undefined : '40px')};

  > span {
    color: white;
    font-size: 18px;
    font-weight: 700;
    text-shadow: 3px 3px 10px 0px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
`;
