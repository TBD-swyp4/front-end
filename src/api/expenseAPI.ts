import axiosInstance from './axios';
import type { ExpenseFormType } from '@models/expense';

/* 소비 내역 저장 (입력 페이지) */
export const saveExpenseData = async (expenseData: ExpenseFormType) => {
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
    return data.data;
  } catch (error) {
    throw new Error('[서버 통신 오류] saveExpenseData : ' + error);
  }
};

/* 소비 내역 수정 (디테일 페이지) */
export const updateExpenseData = async (
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
    throw new Error('[서버 통신 오류] updateExpenseData : ' + error);
  }
};

/* 소비 내역 삭제 (디테일 페이지) */
export const deleteExpenseById = async (articleId: string | undefined) => {
  try {
    const { data } = await axiosInstance.delete(`/articles/${articleId}`);
    return data;
  } catch (error) {
    throw new Error(`[서버 통신 오류] deleteExpenseById : ${articleId}, ${error}`);
  }
};

/* 소비 상세 조회 (디테일 페이지) */
export const fetchExpenseById = async (articleId: string | undefined) => {
  try {
    const { data } = await axiosInstance.get(`/articles/${articleId}`);
    return data;
  } catch (error) {
    throw new Error('[서버 통신 오류] fetchExpenseById : ' + error);
  }
};

/* AI 한마디 받아오기 (디테일 페이지) */
export const fetchAIComment = async (articleId: string | undefined) => {
  try {
    const { data } = await axiosInstance.post('/articles/ai', {
      articleId: articleId,
    });
    return data;
  } catch (error) {
    throw new Error('[서버 통신 오류] fetchAIComment : ' + error);
  }
};
