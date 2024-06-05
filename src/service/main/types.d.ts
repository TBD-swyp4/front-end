import type { ExpenseSummaryType } from '@models/expense';

type MainBudgetType = {
  monthBudget: number;
  monthSpend: number;
  monthSave: number;
};

type MainMonthSpendType = {
  date: string;
  daySpend: number;
  daySave: number;
};

type MainDataType = {
  budget: Budget;
  monthSpendList: MonthSpend[];
  daySpendList: ExpenseSummaryType[];
};

type MainSubDataType = {
  daySpendList: ExpenseSummaryType[];
};
