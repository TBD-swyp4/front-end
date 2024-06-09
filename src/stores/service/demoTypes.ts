import type { UserSettingDataType } from '@service/user/types';
import type { ExpenseDetailDataType } from '@service/expense/types';

type DemoExpenseDataType = ExpenseDetailDataType & { articleId: number };

export type DemoStoreStateType = {
  userSettings: UserSettingDataType;
  demoExpenses: DemoExpenseDataType[];
  nextArticleId: number;
};
export type DemoStoreType = DemoStoreStateType & {
  addDemoExpense: (expense: ExpenseDetailDataType) => number;
  initExpenses: () => void;
  getExpensesCount: () => number;
};

// localStorage의 객체가 DemoStoreState 타입인지 판단하는 타입 가드 선언
const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null;
};

const hasUserSettings = (state: Record<string, unknown>): boolean => {
  const userSettings = state.userSettings;
  return (
    isObject(userSettings) &&
    'email' in userSettings &&
    'mbti' in userSettings &&
    'gender' in userSettings &&
    'budget' in userSettings
  );
};

export const isValidDemoStore = (state: unknown): state is DemoStoreType => {
  if (!isObject(state)) {
    return false;
  }

  return (
    hasUserSettings(state) &&
    'demoExpenses' in state &&
    Array.isArray(state.demoExpenses) &&
    'nextArticleId' in state &&
    typeof state.nextArticleId === 'number'
  );
};
