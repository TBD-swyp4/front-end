import type { ExpenseSummaryType } from '@models/expense';

export type MainData = {
  budget: Budget;
  monthSpendList: MonthSpend[];
  daySpendList: ExpenseSummaryType[];
};

export type MainSubData = {
  daySpendList: ExpenseSummaryType[];
};

export type Budget = {
  monthBudget: number;
  monthSpend: number;
  monthSave: number;
};

export type MonthSpend = {
  date: string;
  daySpend: number;
  daySave: number;
};
