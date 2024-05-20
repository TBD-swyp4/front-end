import { EmotionKey } from '..';

export type DailyAmountType = {
  date: string;
  amount: number;
};

export type EmotionAmountTotalType = {
  emotion: EmotionKey;
  amount: number;
};

export type DashboardPageDataType = {
  dailyAmount: DailyAmountType[];
  emotionAmountTotal: EmotionAmountTotalType[];
  satisfactionAverage: number;
};
