import { createGlobalStyle, css } from 'styled-components';

export const GlobalStyled = createGlobalStyle`
${css`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`}
`;
