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
export const S_Wrapper = styled.div<{ $spacedTop: boolean }>`
  padding-top: ${(props) => (props.$spacedTop ? '120px' : '0')};
  display: flex;
  justify-content: center;
  flex-grow: 1;
  overflow-x: hidden;
`;

export const S_Container = styled.main`
  max-width: 1500px;
  flex-grow: 1;
`;
