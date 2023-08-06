import { AiFillHome } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import { useResetRecoilState } from 'recoil';
import styled from 'styled-components';
import Recommend from '@/components/contents/Recommend';
import SearchBar from '@/components/header/SearchBar';
import { useModal } from '@/hooks/useModal';
import { recommendedContentsState } from '@/recoil/atoms/Atoms';

function MobileGNB() {
  const navigate = useNavigate();
  const resetRecommendedContents = useResetRecoilState(
    recommendedContentsState
  );
  const { openModal, closeModal, modalDataState } = useModal();
  const gnbItems = [
    {
      name: '홈',
      icon: <AiFillHome />,
      onClick: () => {
        if (modalDataState.isOpen) closeModal();
        navigate('/');
      },
    },
    {
      name: '검색',
      icon: <HiMagnifyingGlass />,
      onClick: () => {
        const content = modalDataState.content as JSX.Element;
        if (modalDataState.isOpen && content.type.name === 'SearchBar')
          closeModal();
        else openModal({ content: <SearchBar /> });
      },
    },
    {
      name: '추천해조잉',
      icon: (
        <img
          src={`${import.meta.env.VITE_IMAGE_URL}/profiles/kuhub.webp`}
          alt="쿠로미 아이콘"
        />
      ),
      onClick: () => {
        const content = modalDataState.content as JSX.Element;
        if (modalDataState.isOpen && content.type.name === 'RecommendModal')
          closeModal();
        else {
          openModal({ content: <Recommend /> });
          resetRecommendedContents();
        }
      },
    },
    {
      name: '찜',
      icon: <AiOutlineHeart />,
      onClick: () => {
        if (modalDataState.isOpen) closeModal();
        navigate('/member?content=bookmarks');
      },
    },
  ];
  return (
    <S_Wrapper>
      {gnbItems.map((item) => (
        <li key={item.name} onClick={item.onClick}>
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
    font-size: 13px;
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
