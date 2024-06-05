import type { EmotionKey } from '@models/index';

type DailyAmountType = {
  date: string;
  amount: number;
};
type EmotionAmountTotalType = {
  emotion: EmotionKey;
  amount: number;
};
type DashboardDataType = {
  dailyAmount: DailyAmountType[];
  emotionAmountTotal: EmotionAmountTotalType[];
  satisfactionAverage: number;
};
