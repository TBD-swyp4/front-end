import { EmotionKey } from '..';

import Annoyed from '@assets/images/icon/emotion/annoyed.svg?react';
import Flutter from '@assets/images/icon/emotion/flutter.svg?react';
import Sorry from '@assets/images/icon/emotion/sorry.svg?react';
import Evaded from '@assets/images/icon/emotion/evaded.svg?react';
import Proud from '@assets/images/icon/emotion/proud.svg?react';
import Depressed from '@assets/images/icon/emotion/depressed.svg?react';
import Nervous from '@assets/images/icon/emotion/nervous.svg?react';
import Excited from '@assets/images/icon/emotion/excited.svg?react';
import Tired from '@assets/images/icon/emotion/tired.svg?react';
import Sad from '@assets/images/icon/emotion/sad.svg?react';
import Shy from '@assets/images/icon/emotion/shy.svg?react';
import Lonely from '@assets/images/icon/emotion/lonely.svg?react';

import styled from 'styled-components';

type EmotionDetail = {
  text: string;
  color: string;
  icon: React.ComponentType; // React 컴포넌트 타입, 예를 들어 Icon 컴포넌트 등
};

type EmotionMap = Record<EmotionKey, EmotionDetail>;

const getStyledComponent = (icon: React.ComponentType) => {
  return styled(icon)`
    width: 100%;
    height: 100%;
  `;
};

export const Emotions: Readonly<EmotionMap> = Object.freeze({
  ANNOYED: { text: '짜증/화남', color: '#FFD1DC', icon: getStyledComponent(Annoyed) },
  NERVOUS: { text: '불안/두려움', color: '#FBCBAA', icon: getStyledComponent(Nervous) },
  LONELY: { text: '외로움/고독', color: '#F6DDCC', icon: getStyledComponent(Lonely) },
  TIRED: { text: '피곤/지침', color: '#E8C7C0', icon: getStyledComponent(Tired) },
  DEPRESSED: { text: '우울/권태', color: '#ECE4DB', icon: getStyledComponent(Depressed) },
  SAD: { text: '슬픔/절망', color: '#FAD2E1', icon: getStyledComponent(Sad) },
  SORRY: { text: '죄책감/미안', color: '#CEE7E6', icon: getStyledComponent(Sorry) },
  EXCITED: { text: '기분 좋은/신나는', color: '#D7E3FC', icon: getStyledComponent(Excited) },
  FLUTTER: { text: '설렘/기대', color: '#C3FDB8', icon: getStyledComponent(Flutter) },
  PROUD: { text: '뿌듯/성취', color: '#F3E5AB', icon: getStyledComponent(Proud) },
  SHY: { text: '부끄러움/민망', color: '#B7C3F3', icon: getStyledComponent(Shy) },
  EVADED: { text: '모르겠어요', color: '#FFB6C1', icon: getStyledComponent(Evaded) },
} as const);

export const EmotionTexts = Object.values(Emotions).map((x) => x.text);
export const EmotionColors = Object.values(Emotions).map((x) => x.color);
export const EmotionIcons = Object.values(Emotions).map((x) => x.icon);

export const getEmotionColor = (key: EmotionKey): string => {
  return Emotions[key].color;
};

export const getEmotionText = (key: EmotionKey): string => {
  return Emotions[key].text;
};
export const getEmotionIcon = (key: EmotionKey): React.ComponentType => {
  return Emotions[key].icon;
};
