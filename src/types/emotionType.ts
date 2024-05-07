// 각 감정 아이콘도 여기에 정의 같이 하기.
import { PrevBtn } from '@components/button';

export const EmotionType = {
  ANNOYED: { text: '짜증/화남', color: '#FFD1DC', icon: PrevBtn },
  NERVOUS: { text: '불안/두려움', color: '#FBCBAA', icon: PrevBtn },
  LONELY: { text: '외로움/고독', color: '#F6DDCC', icon: PrevBtn },
  TIRED: { text: '피곤/지침', color: '#E8C7C0', icon: PrevBtn },
  DEPRESSED: { text: '우울/권태', color: '#ECE4DB', icon: PrevBtn },
  SAD: { text: '슬픔/절망', color: '#FAD2E1', icon: PrevBtn },
  SORRY: { text: '죄책감/미안', color: '#CEE7E6', icon: PrevBtn },
  EXCITED: { text: '기분 좋은', color: '#D7E3FC', icon: PrevBtn },
  FLUTTER: { text: '설렘/기대', color: '#C3FDB8', icon: PrevBtn },
  PROUD: { text: '뿌듯/성취', color: '#F3E5AB', icon: PrevBtn },
  EVADED: { text: '모르겠어요', color: '#FFB6C1', icon: PrevBtn },
  SHY: { text: '부끄러움', color: '#B7C3F3', icon: PrevBtn },
} as const;

export const EmotionKeys = Object.keys(EmotionType);
export const EmotionTexts = Object.values(EmotionType).map((x) => x.text);
export const EmotionColors = Object.values(EmotionType).map((x) => x.color);
