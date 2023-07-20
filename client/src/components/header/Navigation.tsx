import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useResetRecoilState } from 'recoil';
import { recommendedContentsState } from '../../recoil/atoms/Atoms';
import { useModal } from '../../hooks/useModal';
import Recommend from '../ui/questions/RecommendModal';

const navMenus = [
  { text: 'TV', route: '/tv' },
  { text: '영화', route: '/movie' },
  { text: '추천해조잉', route: null },
];

function Navigation() {
  const resetRecommendedContents = useResetRecoilState(
    recommendedContentsState
  );
  const { openModal } = useModal();
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  return (
    <StyledNav>
      {navMenus.map((menu) => (
        <S_Heading
          key={menu.text}
          onClick={() => {
            if (menu.route === null) {
              openModal({ content: <Recommend /> });
              resetRecommendedContents();
            } else {
              navigate(menu.route);
            }
          }}
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
  width: 230px;
  @media only screen and (max-width: 770px) {
    width: 180px;
  }
  @media only screen and (max-width: 600px) {
    width: 80px;
  }
  > h1 {
    font-weight: 700;
    text-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
  > h1:nth-child(3) {
    @media only screen and (max-width: 600px) {
      display: none;
    }
  }
`;

const S_Heading = styled.h1<{ $isSelected: boolean }>`
  color: ${(props) => (props.$isSelected ? ' #FF0' : 'white')};
`;
