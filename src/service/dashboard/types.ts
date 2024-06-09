import type { EmotionKey } from '@models/index';

export type DailyAmountType = {
  date: string;
  amount: number;
};
export type EmotionAmountTotalType = {
  emotion: EmotionKey;
  amount: number;
};
export type DashboardDataType = {
  dailyAmount: DailyAmountType[];
  emotionAmountTotal: EmotionAmountTotalType[];
  satisfactionAverage: number;
};
