// import original module declarations
import 'styled-components';

// #20240425.syjang, Theme.ts 내에서 테마 수정 시 type DefaultTheme 변경이 필요합니다.
declare module 'styled-components' {
  export type DefaultTheme = {
    bgImage: string;
    backgroundColor: {
      layout: string;
      navigation: string;
      contentBox: string;
    };
    navigation: {
      icon: string;
      title: string;
    };
    colors: {
      lightGreen: string;
      white: string;
      black: string;
      lightBlack: string;
      lightRed: string;
      lightGray: string;
      gray: string;
      darkLightGray: string;
      darkGray: string;
    };
    shadows: {
      on: string;
      under: string;
      around: string;
    };
  };
}
