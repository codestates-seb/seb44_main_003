import { styled } from 'styled-components';
import { BiX } from 'react-icons/bi';
import bee_happy from '../../assets/profiles/bee_happy.png';
import kongdami from '../../assets/profiles/kongdami.png';
import kuroming from '../../assets/profiles/kuroming.png';
import metamong from '../../assets/profiles/metamong.png';
import padakmon from '../../assets/profiles/padakmon.png';
import mukgoja from '../../assets/profiles/mukgoja.png';
import { useSetRecoilState } from 'recoil';
import { profileModalState } from '../../recoil/atoms/atom';

const defaultProfiles = [
  {
    id: 1,
    name: 'bee_happy',
    src: bee_happy,
  },
  {
    id: 2,
    name: 'kongdami',
    src: kongdami,
  },
  {
    id: 3,
    name: 'kuroming',
    src: kuroming,
  },
  {
    id: 4,
    name: 'metamong',
    src: metamong,
  },
  {
    id: 5,
    name: 'padakmon',
    src: padakmon,
  },
  {
    id: 6,
    name: 'mukgoja',
    src: mukgoja,
  },
];

function ProfileModal() {
  const setShowModal = useSetRecoilState(profileModalState);
  return (
    <S_Modal>
      <BiX
        onClick={() => {
          setShowModal(false);
        }}
      />
      <h1>프로필 선택</h1>
      <h2>사용할 프로필을 선택해주세요.</h2>
      <div>
        {defaultProfiles.map((profile) => (
          <img
            id={profile.id.toString()}
            src={profile.src}
            alt={profile.name}
          />
        ))}
      </div>
    </S_Modal>
  );
}

export default ProfileModal;

const S_Modal = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 700px;
  height: 500px;
  border-radius: 10px;
  border: 1px solid var(--color-white-80);
  background: #282f39;
  color: #fff;
  font-size: 30px;
  z-index: 9999;
  > svg {
    align-self: flex-end;
    margin: 15px 15px 0 0;
    cursor: pointer;
  }
  > h1 {
    font-size: 26px;
    margin-bottom: 10px;
  }
  > h2 {
    font-size: 22px;
    font-weight: 400;
    color: var(--color-white-80);
  }
  > div {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    width: 420px;

    > img {
      width: 140px;
      height: 140px;
      border-radius: 5px;
      margin-bottom: 20px;
    }
  }
`;
