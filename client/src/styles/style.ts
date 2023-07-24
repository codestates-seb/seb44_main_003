import styled from 'styled-components';

/* ----- Root ----- */
export const S_Root = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-size: 16px;

  @media only screen and (max-width: 480px) {
    font-size: 13px;
  }
  & h1,
  h2,
  h3,
  h4 {
    font-size: 18px;
    @media only screen and (max-width: 480px) {
      font-size: 14px;
    }
  }
`;

/* ----- Wrapper Root-Main ----- */
export const S_Wrapper = styled.div`
  margin: 0 auto;
  flex-grow: 1;
  overflow-x: hidden;
`;

export const S_Container = styled.main`
  max-width: 1500px;
  flex-grow: 1;
`;

/* ----- Bookmark, Recommend ----- */
export const S_IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--color-white-100);
  font-weight: bold;
  margin: 12px 24px;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  p {
    margin-top: 6px;
    opacity: 0.8;
  }
  .isTrue {
    opacity: 1;
  }
  svg {
    transition: transform 0.3s ease-out;
    cursor: pointer;
    opacity: 0.8;
  }
  svg:hover {
    transform: scale(1.1);
  }
  svg:not(:hover) {
    transform: scale(1);
  }
`;

/* ----- member page modal ----- */
export const S_Modal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 700px;
  min-height: 500px;
  border-radius: 10px;
  border: 1px solid var(--color-white-80);
  background: #282f39;
  color: #fff;
  z-index: 9999;

  @media only screen and (max-width: 600px) {
    width: 370px;
    min-height: 200px;
    padding-bottom: 10px;
  }
  & svg {
    font-size: 30px;
    align-self: flex-end;
    margin: 15px 15px 0 0;
    cursor: pointer;

    @media only screen and (max-width: 600px) {
      font-size: 25px;
      margin: 10px 10px 0 0;
    }
  }

  > h1 {
    font-size: 26px;
    margin-bottom: 10px;

    @media only screen and (max-width: 600px) {
      font-size: 20px;
      margin-bottom: 5px;
    }
  }

  > h2 {
    font-size: 22px;
    font-weight: 400;
    color: var(--color-white-80);

    @media only screen and (max-width: 600px) {
      font-size: 16px;
    }
  }
`;
