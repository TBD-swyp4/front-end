import axiosInstance from '@api/axios';
import { ExpenseFormType } from '@models/expense';

/**
 * 입력 페이지 저장 쿼리메인 페이지 데이터 (예산, 달력, 요약 정보)
 * @param expenseData
 * @returns
 */
export const saveExpense = async (expenseData: ExpenseFormType) => {
  try {
    // data 가공 필요 시 여기서 처리
    const { data } = await axiosInstance.post('/articles', {
      content: expenseData.content,
      amount: expenseData.amount,
      spendDate: expenseData.spendDate,
      event: expenseData.event,
      thought: expenseData.thought,
      emotion: expenseData.emotion,
      satisfaction: expenseData.satisfaction,
      reason: expenseData.reason,
      improvements: expenseData.improvements,
      registerType: expenseData.registerType,
    });
    return data;
  } catch (error) {
    throw new Error('[서버 통신 오류] saveExpense : ' + error);
  }
};
