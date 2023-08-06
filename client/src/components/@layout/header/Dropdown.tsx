import { Dispatch, SetStateAction } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expiration');
  localStorage.removeItem('refresh');
  location.reload();
};

function Dropdown({
  avatarUri,
  nickname,
  setShowDropdown,
}: {
  avatarUri: string;
  nickname: string;
  setShowDropdown: Dispatch<SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();

  return (
    <S_Wrapper
      onMouseOver={() => setShowDropdown(true)}
      onMouseOut={() => setShowDropdown(false)}
    >
      <div>
        <img role="presentation" src={avatarUri} alt="멤버 이미지" />
        <h1>{nickname}</h1>
      </div>
      <ul>
        <li role="presentation" onClick={() => navigate('/member')}>
          <BsFillPersonFill />
          회원정보
        </li>
        <li
          role="presentation"
          onClick={() => navigate('/member?content=bookmarks')}
        >
          <AiFillHeart />찜 목록
        </li>
        <li role="presentation" onClick={logout}>
          <FiLogOut />
          로그아웃
        </li>
      </ul>
    </S_Wrapper>
  );
}

export default Dropdown;

const S_Wrapper = styled.nav`
  display: flex;
  flex-direction: column;
  z-index: 9999;
  position: absolute;
  color: white;
  width: 200px;
  height: 210px;
  background-color: var(--color-dropdown);
  border: 1px solid var(--color-dropdown-stroke);
  border-radius: 5px;
  box-shadow: 4px 4px 10px 0px rgba(0, 0, 0, 0.4);
  top: 60px;
  right: 10px;
  @media only screen and (max-width: 480px) {
    width: 170px;
    height: 190px;
  }
  > div:first-child {
    display: flex;
    align-items: center;
    padding: 15px 20px;
    border-bottom: 1px solid var(--color-dropdown-stroke);
  }
  > ul {
    display: flex;
    padding: 5px 0;
    flex-direction: column;
    justify-content: space-around;
    flex-grow: 1;
    color: var(--color-white-80);

    > li {
      padding: 0 20px;
      display: flex;
      align-items: center;
      cursor: pointer;
      @media only screen and (max-width: 480px) {
        font-size: 14px;
      }
    }
    > li:hover {
      color: white;
      transition: color 0.3s ease;
    }
  }
  & img {
    width: 45px;
    height: 45px;
    border-radius: 5px;
    margin-right: 10px;
  }
  & svg {
    margin-right: 8px;
    font-size: 22px;
  }
`;
