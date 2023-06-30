import { styled } from 'styled-components';

const navMenus = ['TV', '영화', '추천해조잉'];

function Navigation() {
  return (
    <StyledNav>
      {navMenus.map((menu) => (
        <span>{menu}</span>
      ))}
    </StyledNav>
  );
}

export default Navigation;

const StyledNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;

  > span {
    margin: 0 30px;
    color: white;
    font-size: 18px;
    font-weight: 700;
    text-shadow: 3px 3px 10px 0px rgba(0, 0, 0, 0.2);
  }
`;
