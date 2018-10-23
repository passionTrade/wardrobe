import { injectGlobal } from 'styled-components';
import { normalize } from '../theme';

const injectGlobalStyles = () => injectGlobal`
  ${normalize};
  html, body {
    font-family: "Avenir Next", Arial, "Helvetica Neue", Helvetica, sans-serif;
    font-weight: normal;
  }
`;

injectGlobalStyles();