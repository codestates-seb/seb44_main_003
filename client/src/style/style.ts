import styled from 'styled-components';

/* ----- Root ----- */
export const S_Root = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

/* ----- Wrapper Root-Main ----- */
export const S_Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 1;
  width: calc(100%-(60px));
  overflow: hidden;
  margin: 0 30px;
`;

export const S_Container = styled.main`
  max-width: 1500px;
  flex-grow: 1;
`;
