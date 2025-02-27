import * as P from './part';
import * as R from 'react';
import * as S from 'styled-components';

type Props = {
  children: R.ReactNode;
};

export const GlobalStyle = ({ children }: Props) => {
  return (
    <S.ThemeProvider theme={P.theme}>
      <P.GlobalStyled />
      {children}
    </S.ThemeProvider>
  );
};
