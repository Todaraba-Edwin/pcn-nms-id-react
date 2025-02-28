import { DefaultTheme } from 'styled-components';
import * as SC from '@/5_shared/constants';

export const colors = {};

export const imageUrls = {
  login: {
    bg: `url(${SC.imagePath.login.bg})`,
  },
};

export const theme: DefaultTheme = {
  colors,
  imageUrls,
};
