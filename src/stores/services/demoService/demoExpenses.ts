import { MAX_EXPENSE_SIZE } from '@stores/storeConfig';

import type { ExpenseDetailDataType } from '@service/expense/types';
import type { DemoStoreType } from './demoTypes';
import type { ExpenseFilterType } from '@models/expense';

export const getDemoExpenseById = (get: () => DemoStoreType, articleId: string) => {
  return get().demoExpenses.find((expense) => expense.articleId === Number(articleId));
};

export const addDemoExpense = (
  set: (fn: (state: DemoStoreType) => void) => void,
  get: () => DemoStoreType,
  expense: ExpenseDetailDataType,
) => {
  if (get().demoExpenses.length >= MAX_EXPENSE_SIZE) return -1;
  const saveArticleId: number = get().nextArticleId;
  set((state) => {
    state.demoExpenses.push({
      ...expense,
      articleId: state.nextArticleId,
    });
    state.nextArticleId += 1;
  });
  return saveArticleId;
};

export const updateDemoExpense = (
  set: (fn: (state: DemoStoreType) => void) => void,
  articleId: string,
  data: ExpenseDetailDataType,
) => {
  set((state) => {
    const index = state.demoExpenses.findIndex(
      (expense) => expense.articleId === Number(articleId),
    );
    if (index !== -1) {
      state.demoExpenses[index] = { ...state.demoExpenses[index], ...data };
    }
  });
};

export const deleteDemoExpense = (
  set: (fn: (state: DemoStoreType) => void) => void,
  articleId: string,
) => {
  set((state) => {
    state.demoExpenses = state.demoExpenses.filter(
      (expense) => expense.articleId !== Number(articleId),
    );
  });
};

export const getDemoExpenseByCondition = (
  get: () => DemoStoreType,
  condition: ExpenseFilterType,
) => {
  console.log(condition);
  return get().demoExpenses.map((x) => x);
};

export const getDemoExpensesCount = (get: () => DemoStoreType) => {
  return get().demoExpenses.length;
};
