import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools, persist } from 'zustand/middleware';

import type { ExpenseDetailDataType } from '@service/expense/types';
import type { DemoStoreType } from './service/demoTypes';
import { initDemoState, migrateDemoStore } from './service/demoService';
import { CURRENT_VERSION, DEMO_STORE_NAME, MAX_EXPENSE_SIZE } from './storeConfig';

export const useDemoStore = create<DemoStoreType>()(
  immer(
    devtools(
      persist(
        (set, get) => ({
          ...initDemoState(), // 상태 초기값 지정
          getDemoExpenseById: (articleId: string) => {
            return get().demoExpenses.find((expense) => expense.articleId === Number(articleId));
          },
          addDemoExpense: (expense: ExpenseDetailDataType) => {
            // 개발하다가 함수 분리할 수 있으면 service로 분리하기
            // 체험하기 최대 저장 개수 10개 제한
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
          },
          updateDemoExpense: (articleId: string, data: ExpenseDetailDataType) => {
            set((state) => {
              const index = state.demoExpenses.findIndex(
                (expense) => expense.articleId === Number(articleId),
              );
              if (index !== -1) {
                state.demoExpenses[index] = { ...state.demoExpenses[index], ...data };
              }
            });
          },
          deleteDemoExpense: (articleId: string) => {
            set((state) => {
              state.demoExpenses = state.demoExpenses.filter(
                (expense) => expense.articleId !== Number(articleId),
              );
            });
          },
          setDemoUserSetting: (budget: number) => {
            set((state) => {
              state.userSettings.budget = budget;
            });
          },
          initExpenses: () => {
            // demoExpenses 를 기본값으로 초기화한다.
            set(() => initDemoState());
          },
          getExpensesCount: () => {
            return get().demoExpenses.length;
          },
        }),
        {
          name: DEMO_STORE_NAME,
          getStorage: () => localStorage,
          version: CURRENT_VERSION,
          migrate: migrateDemoStore,
        },
      ),
    ),
  ),
);
