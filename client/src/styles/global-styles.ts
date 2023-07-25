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

textarea {
  resize: none;
}

textarea:focus, input:focus {
  outline: none;
}

.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 56px;
  height: 56px;
}

.lds-ellipsis div {
  position: absolute;
  top: 25px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: gray;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}

.lds-ellipsis div:nth-child(1) {
  left: 4px;
  animation: lds-ellipsis1 0.6s infinite;
}

.lds-ellipsis div:nth-child(2) {
  left: 4px;
  animation: lds-ellipsis2 0.6s infinite;
}

.lds-ellipsis div:nth-child(3) {
  left: 15px;
  animation: lds-ellipsis2 0.6s infinite;
}

.lds-ellipsis div:nth-child(4) {
  left: 20px;
  animation: lds-ellipsis3 0.6s infinite;
}

@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}

@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(10px, 0);
  }
}
`;

export default GlobalStyle;
