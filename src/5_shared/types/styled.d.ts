import * as P from './part';

export type ColoresType = typeof P.colors;
export type ImageUrlsType = typeof P.imageUrls;

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: ColoresType;
    imageUrls: ImageUrlsType;
  }
}
