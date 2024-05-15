import axiosInstance from '@api/axios';
import { ExpenseFormType } from '@models/expense';

/**
 * 소비 데이터 저장
 * @param articleId
 * @param expenseData
 * @returns
 */
export const saveExpenseData = async (
  articleId: string | undefined,
  expenseData: ExpenseFormType,
) => {
  try {
    // data 가공 필요 시 여기서 처리
    const { data } = await axiosInstance.patch(`/articles/${articleId}`, {
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
    throw new Error('[서버 통신 오류] saveExpenseData : ' + error);
  }
};
