import { Gender, MBTI } from '@models/index';

export type UserSettingDataType = {
  email: string;
  mbti: MBTI;
  gender: Gender;
  budget: number;
};
