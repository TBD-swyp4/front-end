import { useMutation } from 'react-query';
import { fetchAIComment } from '@api/expenseAPI';

import type { UseFormSetValue } from 'react-hook-form';
import type { ExpenseFormType } from '@models/expense';

const useAICommentData = (setValue: UseFormSetValue<ExpenseFormType>) => {
  return useMutation(fetchAIComment, {
    onSuccess: (commentData) => {
      // #20240516.syjang, aiComment->content로 변경
      setValue('aiComment', commentData.data.content);
    },
    onError: (error) => {
      alert('다시 시도해주세요.');
      console.error(`삭제 실패: ${error}`);
    },
  });
};

export default useAICommentData;
