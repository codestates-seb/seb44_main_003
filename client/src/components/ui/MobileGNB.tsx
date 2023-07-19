import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Recommend from './questions/Recommend';
import { useModal } from '../../hooks/useModal';
import { AiFillHome } from 'react-icons/ai';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { AiOutlineHeart } from 'react-icons/ai';
import kuromi from '../../assets/profiles/kuhub.webp';

function MobileGNB() {
  const navigate = useNavigate();
  const { openModal } = useModal();
  const gnbItems = [
    { name: '홈', icon: <AiFillHome />, onClick: () => navigate('/') },
    { name: '검색', icon: <HiMagnifyingGlass />, onClick: () => {} },
    {
      name: '추천해조잉',
      icon: <img src={kuromi} />,
      onClick: () => openModal({ content: <Recommend /> }),
    },
    {
      name: '찜',
      icon: <AiOutlineHeart />,
      onClick: () => navigate('/member?content=bookmarks'),
    },
  ];
  return (
    <S_Wrapper>
      {gnbItems.map((item) => (
        <li onClick={item.onClick}>
          {item.icon}
          <h1>{item.name}</h1>
        </li>
      ))}
    </S_Wrapper>
  );
}

export default MobileGNB;

const S_Wrapper = styled.ul`
  color: var(--color-white-80);
  display: flex;
  position: fixed;
  justify-content: space-between;
  z-index: 9999;
  bottom: 0;
  width: 100%;
  height: 60px;
  padding: 3px 10px;
  background-color: var(--color-bg-100);
  > li {
    display: flex;
    flex-direction: column;
    flex: 0 0 25%;
    align-items: center;
    justify-content: end;
  }
  & h1 {
    font-size: 14px;
    font-weight: 400;
  }
  & svg {
    font-size: 22px;
    margin-bottom: 5px;
  }
  & img {
    width: 30px;
    margin-bottom: 5px;
  }
`;
