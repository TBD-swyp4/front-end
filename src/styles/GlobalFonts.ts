import { createGlobalStyle } from 'styled-components';

import SUITThin from '/assets/fonts/SUIT/SUIT-Thin.ttf';
import SUITBold from '/assets/fonts/SUIT/SUIT-Bold.ttf';
import SUITExtraBold from '/assets/fonts/SUIT/SUIT-ExtraBold.ttf';
import SUITExtraLight from '/assets/fonts/SUIT/SUIT-ExtraLight.ttf';
import SUITHeavy from '/assets/fonts/SUIT/SUIT-Thin.ttf';
import SUITLight from '/assets/fonts/SUIT/SUIT-Light.ttf';
import SUITMedium from '/assets/fonts/SUIT/SUIT-Medium.ttf';
import SUITRegular from '/assets/fonts/SUIT/SUIT-Regular.ttf';
import SUITSemiBold from '/assets/fonts/SUIT/SUIT-SemiBold.ttf';

const GlobalFonts = createGlobalStyle`
  @font-face {
    font-family: 'SUIT';
    src: url(${SUITThin}) format('truetype');
    font-weight: 100;
    font-style: normal;
  }
  @font-face {
    font-family: 'SUIT';
    src: url(${SUITExtraLight}) format('truetype');
    font-weight: 200;
    font-style: normal;
  }
@font-face {
    font-family: 'SUIT';
    src: url(${SUITLight}) format('truetype');
    font-weight: 300;
    font-style: normal;
  }

  @font-face {
    font-family: 'SUIT';
    src: url(${SUITRegular}) format('truetype');
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: 'SUIT';
    src: url(${SUITMedium}) format('truetype');
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: 'SUIT';
    src: url(${SUITSemiBold}) format('truetype');
    font-weight: 600;
    font-style: normal;
  }
  @font-face {
    font-family: 'SUIT';
    src: url(${SUITBold}) format('truetype');
    font-weight: 700;
    font-style: normal;
  }
  @font-face {
    font-family: 'SUIT';
    src: url(${SUITExtraBold}) format('truetype');
    font-weight: 800;
    font-style: normal;
  }
  @font-face {
    font-family: 'SUIT';
    src: url(${SUITHeavy}) format('truetype');
    font-weight: 900;
    font-style: normal;
  }

`;

export default GlobalFonts;
