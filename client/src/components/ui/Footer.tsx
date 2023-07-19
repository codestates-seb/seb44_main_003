import { useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { DiGithubFull } from 'react-icons/di';
import { TfiGithub } from 'react-icons/tfi';
import kuhub from '../../assets/profiles/kuhub.webp';
import logo from '../../assets/logo/overthetop.webp';

function Footer() {
  const location = useLocation();
  const path = location.pathname;

  if (path === '/login' || path === '/signup') {
    return null;
  }

  return (
    <S_Footer>
      <span />
      <S_Logo>
        <img src={logo} alt="logo" />
      </S_Logo>
      <section>
        <div className="team">
          <S_Team
            onClick={() => {
              window.open('https://github.com/JeanneLee57', '_blank');
            }}
          >
            <p>FE 이진화</p>
            <img src={kuhub} alt="kuhub" />
            <DiGithubFull size={30} />
          </S_Team>
          <S_Team
            onClick={() => {
              window.open('https://github.com/oka1313', '_blank');
            }}
          >
            <p>FE 김다미</p>
            <TfiGithub size={40} />
            <DiGithubFull size={30} />
          </S_Team>
          <S_Team
            onClick={() => {
              window.open('https://github.com/Jiwonp12', '_blank');
            }}
          >
            <p>FE 박지원</p>
            <TfiGithub size={40} />
            <DiGithubFull size={30} />
          </S_Team>
        </div>
        <div className="team">
          <S_Team
            onClick={() => {
              window.open('https://github.com/Snu97', '_blank');
            }}
          >
            <p>BE 백순우</p>
            <TfiGithub size={40} />
            <DiGithubFull size={30} />
          </S_Team>
          <S_Team
            onClick={() => {
              window.open('https://github.com/travelerjaguar', '_blank');
            }}
          >
            <p>BE 이상협</p>
            <TfiGithub size={40} />
            <DiGithubFull size={30} />
          </S_Team>
          <S_Team
            onClick={() => {
              window.open('https://github.com/him0814', '_blank');
            }}
          >
            <p>BE 이재익</p>
            <TfiGithub size={40} />
            <DiGithubFull size={30} />
          </S_Team>
        </div>
      </section>
    </S_Footer>
  );
}

export default Footer;

const S_Footer = styled.footer`
  display: flex;
  flex-direction: column;
  width: 100vw;
  padding: 20px 20px 40px 20px;
  span {
    align-self: center;
    width: 1500px;
    height: 1px;
    background-color: var(--color-white-60);
  }
  section {
    display: flex;
    justify-content: center;
  }
  .team {
    padding: 0 10px;
    display: flex;
  }
  h1 {
    color: var(--color-primary-gold);
    margin: 20px 0;
    align-self: center;
  }
  p {
    margin: 5px 0;
  }
  img {
    height: 40px;
    opacity: 0.8;
  }
  @media only screen and (max-width: 740px) {
    section {
      flex-direction: column;
      align-items: center;
    }
    p {
      margin: 0;
    }
    img {
      height: 30px;
    }
  }

  @media only screen and (max-width: 600px) {
    margin-bottom: 30px;
  }
`;

const S_Logo = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  margin: 30px 0;
  img {
    object-fit: cover;
    height: 30px;
  }
`;

const linearGradientMove = keyframes`
  100% {
    background-position: 6px 0, -6px 100%, 0 -6px, 100% 6px;
  }
`;

const S_Team = styled.footer`
  width: 94px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  padding: 4px;
  margin: 0 10px;
  color: var(--color-white-80);
  cursor: pointer;
  background: linear-gradient(90deg, var(--color-white-60) 50%, transparent 50%)
      0 0 / 6px 1px repeat-x,
    linear-gradient(90deg, var(--color-white-60) 50%, transparent 50%) 0 100% /
      6px 1px repeat-x,
    linear-gradient(0, var(--color-white-60) 50%, transparent 50%) 0 0 / 1px 6px
      repeat-y,
    linear-gradient(0, var(--color-white-60) 50%, transparent 50%) 100% 0 / 1px
      6px repeat-y;
  &:hover {
    color: var(--color-white-100);
    box-shadow: 0px 0px 3px var(--color-primary-gold);
    transition: all 0.3s ease-in-out;
    outline: none;
    background: linear-gradient(
          90deg,
          var(--color-primary-gold) 50%,
          transparent 50%
        )
        0 0 / 6px 1px repeat-x,
      linear-gradient(90deg, var(--color-primary-gold) 50%, transparent 50%) 0
        100% / 6px 1px repeat-x,
      linear-gradient(0, var(--color-primary-gold) 50%, transparent 50%) 0 0 /
        1px 6px repeat-y,
      linear-gradient(0, var(--color-primary-gold) 50%, transparent 50%) 100% 0 /
        1px 6px repeat-y;
    animation: ${linearGradientMove} 0.1s infinite;
    img {
      opacity: 1;
      transition: all 0.3s ease-in-out;
    }
  }

  @media only screen and (max-width: 740px) {
    width: 130px;
    height: 40px;
    flex-direction: row;
    justify-content: space-evenly;
    margin: 1vh 0.5vw;
    padding: 1px;
    & > svg {
      height: 27px;
    }
    & > svg:last-child {
      display: none;
    }
  }
`;
