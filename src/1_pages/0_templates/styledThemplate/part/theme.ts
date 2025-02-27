import { imagePath } from '@/5_shared/constants';
import { DefaultTheme } from 'styled-components';

export const colors = {};

export const imageUrls = {
  login: {
    bg: `url(${imagePath.login.bg})`,
  },
};

export const theme: DefaultTheme = {
  colors,
  imageUrls,
};
