import type { ExpenseSummaryType } from '@models/expense';

export type MainBudgetType = {
  monthBudget: number;
  monthSpend: number;
  monthSave: number;
};

export type MainMonthSpendType = {
  date: string;
  daySpend: number;
  daySave: number;
};

export type MainDataType = {
  budget: MainBudgetType;
  monthSpendList: MainMonthSpendType[];
  daySpendList: ExpenseSummaryType[];
};

export type MainSubDataType = {
  daySpendList: ExpenseSummaryType[];
};
