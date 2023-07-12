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
  display: flex;
  justify-content: center;
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
