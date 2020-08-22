import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset} 
  
  *, *::before, *::after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  html {
    font-size: 62.5%;
  }
  
  body {
    font-size: 1.6rem;
    font-family: 'Lato', sans-serif;
  }

  h1, h2 {
    font-weight: 700;
  }

  h3 {
    font-weight: 400;
  }

  h4, h5, p {
    font-weight: 300;
  }
`;

export default GlobalStyle;
