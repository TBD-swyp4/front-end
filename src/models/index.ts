export const Registers = ['SPEND', 'SAVE'] as const;

export type Register = (typeof Registers)[number];

export const EmotionKeys = [
  'ANNOYED',
  'NERVOUS',
  'LONELY',
  'TIRED',
  'DEPRESSED',
  'SAD',
  'SORRY',
  'EXCITED',
  'FLUTTER',
  'PROUD',
  'SHY',
  'EVADED',
] as const; // 'as const'를 사용하여 리터럴 타입으로 배열을 고정

// 타입을 배열에서 추출
export type EmotionKey = (typeof EmotionKeys)[number];

// 입력 초기 시, 감정 미선택으로 빈 문자 허용
export type EmotionKeyWithNone = EmotionKey | '';
