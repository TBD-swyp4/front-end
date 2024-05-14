import { DefaultTheme } from 'styled-components';

// #20240425.syjang, 색 및 interface는 임의로 작성했습니다. 여기에 공통에서 쓰일 것들을 정의하면 됩니다.
// 예시로 작성한 것이므로, 테마 이름과 내용 모두 수정 가능하나 styled.d.ts 내의 DefaultTheme type도 함께 수정해주셔야 합니다.
export const lightTheme: DefaultTheme = {
  bgImage: '/src/assets/images/background/backGround.svg',
  colors: {
    main: '#47CFB0',
    font: '#333331',
    background: '#f4f4f4',
    mainBackground: '#47CFB0',
    footerArea: '#fff',
    button: '#47CFB0',
    navFont: '#18D19E',
    navBackground: '#fff',
    contentBox: '#fff',
    minus: '#fc4873',
  },
  shadows: {
    on: '0px -5px 10px -10px gray',
    under: '0px 5px 10px -10px gray',
    around: '0px 5px 14.56px 0px #5252521a',
  },
};
