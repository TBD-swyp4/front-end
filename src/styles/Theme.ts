import { DefaultTheme } from 'styled-components';

// #20240425.syjang, 색 및 interface는 임의로 작성했습니다. 여기에 공통에서 쓰일 것들을 정의하면 됩니다.
// 예시로 작성한 것이므로, 테마 이름과 내용 모두 수정 가능하나 styled.d.ts 내의 DefaultTheme type도 함께 수정해주셔야 합니다.
export const lightTheme: DefaultTheme = {
  bgImage: '/src/assets/images/background/backGroundLight.png',
  fontColor: '#000',
  modalBox: '#fff',
  stateModal: '#fff',
  footerArea: '#d7e5fa',
  button: '#b0b0b0',
};

export const darkTheme: DefaultTheme = {
  bgImage: '/src/assets/images/background/backGroundDark.png',
  fontColor: '#fff',
  modalBox: '#121212',
  stateModal: '#121212',
  footerArea: '#2f4768',
  button: '#fff',
};
