import * as R from 'react';
import * as S from 'styled-components';
import * as SAG from '@/5_shared/atoms/GlobalStyled';

type Props = {
  children: R.ReactNode;
};

export const StyledThemplate = ({ children }: Props) => {
  return (
    <S.ThemeProvider theme={SAG.theme}>
      <SAG.GlobalStyled />
      {children}
    </S.ThemeProvider>
  );
};
