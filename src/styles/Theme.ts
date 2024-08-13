import { DefaultTheme } from 'styled-components';

// 예시로 작성한 것이므로, 테마 이름과 내용 모두 수정 가능하나 styled.d.ts 내의 DefaultTheme type도 함께 수정해주셔야 합니다.
export const lightTheme: DefaultTheme = {
  bgImage: '/src/assets/images/background/backGround.svg',
  backgroundColor: {
    layout: '#f4f4f4',
    navigation: '#ffffff',
    contentBox: '#ffffff',
  },
  navigation: {
    icon: '#bcbcbc',
    title: '#a7acaa',
  },
  colors: {
    lightGreen: '#47cfb0',
    white: '#ffffff',
    black: '#000000',
    lightBlack: '#333331',
    lightRed: '#fc4873',
    lightGray: '#dddddd',
    gray: '#cccccc',
    darkLightGray: '#9f9f9f',
    darkGray: '#575755',
  },
  shadows: {
    on: '0px -5px 10px -10px gray',
    under: '0px 5px 10px -10px gray',
    around: '0px 5px 14.56px 0px #5252521a',
  },
};
