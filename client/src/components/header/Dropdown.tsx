import { BsFillPersonFill } from 'react-icons/bs';
import { AiFillHeart } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Dispatch, SetStateAction } from 'react';

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expiration');
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
  const goToMemberInfo = () => navigate('/member');

  return (
    <S_Wrapper
      onMouseOver={() => setShowDropdown(true)}
      onMouseOut={() => setShowDropdown(false)}
    >
      <div>
        <img src={avatarUri} alt="user image" />
        <h1>{nickname}</h1>
      </div>
      <div>
        <div onClick={goToMemberInfo}>
          <BsFillPersonFill />
          회원정보
        </div>
        <div onClick={goToMemberInfo}>
          <AiFillHeart />찜 목록
        </div>
        <div onClick={logout}>
          <FiLogOut />
          로그아웃
        </div>
      </div>
    </S_Wrapper>
  );
}

export default Dropdown;

const S_Wrapper = styled.div`
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
  top: 50px;
  right: 10px;
  > div:first-child {
    display: flex;
    align-items: center;
    padding: 15px 20px;
    border-bottom: 1px solid var(--color-dropdown-stroke);
  }
  > div:nth-child(2) {
    display: flex;
    padding: 5px 0;
    flex-direction: column;
    justify-content: space-around;
    flex-grow: 1;
    color: var(--color-white-80);
    > div {
      padding: 0 20px;
      display: flex;
      cursor: pointer;
    }
    > div:hover {
      color: white;
      transition: color 0.5s ease;
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
