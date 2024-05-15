import axiosInstance from '@api/axios';

/**
 * 소비 상세 조회 데이터
 * @param articleId 게시글 Id
 * @returns
 */
export const deleteExpenseById = async (articleId: string | undefined) => {
  try {
    alert(articleId);
    const { data } = await axiosInstance.delete(`/articles/${articleId}`);
    return data;
  } catch (error) {
    throw new Error(`[서버 통신 오류] deleteExpenseById : ${articleId}, ${error}`);
  }
};
