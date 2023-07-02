import styled from 'styled-components';

/* ----- Root ----- */
export const StyledRoot = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

/* ----- Wrapper Root-Main ----- */
export const StyledWrapper = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  width: calc(100%-(60px));
  overflow: hidden;
  margin: 0 30px;
`;
