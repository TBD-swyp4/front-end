// import original module declarations
import 'styled-components';

// #20240425.syjang, Theme.ts 내에서 테마 수정 시 type DefaultTheme 변경이 필요합니다.
declare module 'styled-components' {
  export type DefaultTheme = {
    bgImage: string;
    fontColor: string;
    modalBox: string;
    stateModal: string;
    footerArea: string;
    button: string;
  };
}
