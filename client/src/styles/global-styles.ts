import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  list-style: none;
  max-width: 100%;
}

body {
  font-family: 'inter', sans-serif;
  background-color: var(--color-bg-100);
  width: 100vw;
  height: 100vh;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  all: unset;
  cursor: pointer;
  text-align: center;
  outline: none;
}

textarea{
  resize: none
}

textarea:focus, input:focus {
  outline: none;
}

ol, ul, li {
  list-style: none;
}
`;

export default GlobalStyle;
