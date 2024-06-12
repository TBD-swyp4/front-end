import { compareYMDString, compareYMString, formatFromServer } from '@utils/index';
import type { DemoExpenseDataType } from './types';
import type { EmotionKey } from '@models/index';

type DailyGroupedDataType = {
  [date: string]: {
    date: string;
    daySpend: number;
    daySave: number;
  };
};

type EmotionalGroupedDataType = {
  [emotion: string]: {
    emotion: EmotionKey;
    daySpend: number;
    daySave: number;
  };
};

// 데모 데이터에서 년,월,일 동일한 날짜 찾기
export const getSameYMDSpendList = (
  selectDate: string,
  demoExpenses: DemoExpenseDataType[],
): DemoExpenseDataType[] => {
  return demoExpenses.filter((expense) => {
    return compareYMDString(selectDate, formatFromServer(expense.spendDate));
  });
};

// 데모 데이터에서 년,월 동일한 날짜 찾기
export const getSameYMSpendList = (
  selectDate: string,
  demoExpenses: DemoExpenseDataType[],
): DemoExpenseDataType[] => {
  return demoExpenses.filter((expense) => {
    return compareYMString(selectDate, formatFromServer(expense.spendDate));
  });
};

// 날짜 별로 지출, 소비 총합 데이터를 그룹화
export const getGroupSumAmountsByDate = (
  demoExpenses: DemoExpenseDataType[],
): DailyGroupedDataType => {
  // 날짜 별로 데이터를 그룹화하고 각 amount를 합산
  const initialGroupedData: DailyGroupedDataType = {};
  const groupedData: DailyGroupedDataType = demoExpenses.reduce((acc, expense) => {
    // `yyyy-MM-ddThh:mm:ss` -> yyyyMMdd 형태로 변환
    const date = expense.spendDate.split('T')[0].replace(/-/g, '');

    // 현재 날짜의 속성이 없다면 새로운 속성과 초기값 추가
    if (!acc[date]) {
      acc[date] = { date, daySpend: 0, daySave: 0 };
    }
    if (expense.registerType === 'SPEND') {
      acc[date].daySpend += parseFloat(expense.amount);
    } else if (expense.registerType === 'SAVE') {
      acc[date].daySave += parseFloat(expense.amount);
    }
    return acc;
  }, initialGroupedData);

  return groupedData;
};

export const getGroupSumAmountsByEmotion = (
  demoExpenses: DemoExpenseDataType[],
): EmotionalGroupedDataType => {
  // 감정 별로 데이터를 그룹화하고 각 amount를 합산
  const initialGroupedData: EmotionalGroupedDataType = {};
  const groupedData: EmotionalGroupedDataType = demoExpenses.reduce((acc, expense) => {
    const emotion = expense.emotion;
    if (emotion === '') return acc;

    // 현재 감정의 속성이 없다면 새로운 속성과 초기값 추가
    if (!acc[emotion]) {
      acc[emotion] = { emotion, daySpend: 0, daySave: 0 };
    }
    if (expense.registerType === 'SPEND') {
      acc[emotion].daySpend += parseFloat(expense.amount);
    } else if (expense.registerType === 'SAVE') {
      acc[emotion].daySave += parseFloat(expense.amount);
    }
    return acc;
  }, initialGroupedData);

  return groupedData;
};
