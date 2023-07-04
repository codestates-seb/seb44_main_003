import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';

const navMenus = [
  { text: 'TV', route: '/tv' },
  { text: '영화', route: '/movie' },
  { text: '추천해조잉', route: '/recommend' },
];

function Navigation() {
  const navigate = useNavigate();
  return (
    <StyledNav>
      {navMenus.map((menu) => (
        <h1 onClick={() => navigate(menu.route)}>{menu.text}</h1>
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
    color: white;
    font-weight: 700;
    text-shadow: 3px 3px 10px 0px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
`;
