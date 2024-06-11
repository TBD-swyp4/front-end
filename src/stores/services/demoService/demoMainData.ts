import type { MainDataType, MainSubDataType } from '@service/main/types';
import type { DemoExpenseDataType, DemoStoreType } from './demoTypes';
import type { EmotionKey, Register } from '@models/index';
import type { MainMonthSpendType } from '@service/main/types';
import type { ExpenseSummaryType } from '@models/expense';
import { compareYMDString, compareYMString, formatFromServer } from '@utils/index';

type TempDailyGroupedDataType = {
  [date: string]: {
    date: string;
    daySpend: number;
    daySave: number;
  };
};

export const getDemoMainData = (get: () => DemoStoreType, selectDate: string): MainDataType => {
  console.log(`demo main date : ${selectDate}`);

  // 현재 전달받은 yyyyMMdd 형태의 날짜와 같은 년,월인 날짜만을 뽑아낸다.
  const selectSameMonthExpenses = getSameYMSpendList(selectDate, get().demoExpenses);
  const selectSameDayExpenses = getSameYMDSpendList(selectDate, get().demoExpenses);

  const totalSpendAmount = calculateTotalAmountByRegisterType('SPEND', selectSameMonthExpenses);
  const totalSaveAmount = calculateTotalAmountByRegisterType('SAVE', selectSameMonthExpenses);

  const demoMonthSpendList = getDemoMonthSpendList(selectSameMonthExpenses);
  const demoDaySpendList: ExpenseSummaryType[] = getDemoDaySpendList(selectSameDayExpenses);

  const rtnData = {
    budget: {
      monthBudget: get().userSettings.budget,
      monthSpend: totalSpendAmount,
      monthSave: totalSaveAmount,
    },
    monthSpendList: demoMonthSpendList,
    // default로 selectDate의 소비 기록을 보내준다.
    daySpendList: demoDaySpendList,
  };
  return rtnData;
};

export const getDemoMainSubData = (
  get: () => DemoStoreType,
  selectDate: string,
): MainSubDataType => {
  console.log(`demo main sub date : ${selectDate}`);
  const selectSameDayExpenses = getSameYMDSpendList(selectDate, get().demoExpenses);
  const demoDaySpendList: ExpenseSummaryType[] = getDemoDaySpendList(selectSameDayExpenses);

  const rtnData = {
    daySpendList: demoDaySpendList,
  };
  return rtnData;
};

// 데모 데이터에서 년,월,일 동일한 날짜 찾기
const getSameYMDSpendList = (
  selectDate: string,
  demoExpenses: DemoExpenseDataType[],
): DemoExpenseDataType[] => {
  return demoExpenses.filter((expense) => {
    return compareYMDString(selectDate, formatFromServer(expense.spendDate));
  });
};

// 데모 데이터에서 년,월 동일한 날짜 찾기
const getSameYMSpendList = (
  selectDate: string,
  demoExpenses: DemoExpenseDataType[],
): DemoExpenseDataType[] => {
  return demoExpenses.filter((expense) => {
    return compareYMString(selectDate, formatFromServer(expense.spendDate));
  });
};

// 전달받은 DemoExpenseDataType 리스트에서 특정 regiesterType의 amount 합 구하기
const calculateTotalAmountByRegisterType = (
  registerType: Register,
  demoExpenses: DemoExpenseDataType[],
): number => {
  return demoExpenses.reduce((sum, expense) => {
    return expense.registerType === registerType ? sum + parseFloat(expense.amount) : sum;
  }, 0);
};

const getDemoMonthSpendList = (demoExpenses: DemoExpenseDataType[]): MainMonthSpendType[] => {
  // 날짜별로 데이터를 그룹화하고 합산
  const initialGroupedData: TempDailyGroupedDataType = {};
  const groupedData: TempDailyGroupedDataType = demoExpenses.reduce((acc, expense) => {
    // `yyyy-MM-ddThh:mm:ss` -> yyyyMMdd 형태로 변환
    const date = expense.spendDate.split('T')[0].replace(/-/g, '');
    // 초기 객체 선언
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

  // 날짜별 그룹화된 데이터를 원하는 형식으로 변환 및 필터링
  return Object.values(groupedData).filter(
    (expense) => expense.daySpend !== 0 || expense.daySave !== 0,
  );
};

//: ExpenseSummaryType[]
const getDemoDaySpendList = (demoExpenses: DemoExpenseDataType[]): ExpenseSummaryType[] => {
  return demoExpenses.map((expense) => {
    const emotion: EmotionKey = expense.emotion || 'EVADED';
    return {
      articleId: expense.articleId,
      emotion,
      satisfaction: expense.satisfaction,
      content: expense.content,
      amount: expense.amount,
      registerType: expense.registerType,
    };
  });
};
