// import original module declarations
import 'styled-components';

// #20240425.syjang, Theme.ts 내에서 테마 수정 시 type DefaultTheme 변경이 필요합니다.
declare module 'styled-components' {
  export type DefaultTheme = {
    bgImage: string;
    colors: {
      main: string;
      font: string;
      background: string;
      mainBackground: string;
      footerArea: string;
      button: string;
      navFont: string;
      navBackground: string;
      contentBox: string;
      minus: string;
    };
    shadows: {
      on: string;
      under: string;
      around: string;
    };
  };
}
