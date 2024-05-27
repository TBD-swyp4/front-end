import { useMutation } from 'react-query';
import { updateExpenseData } from '@api/expenseAPI';

import useToast from '@hooks/useToast';
import type { ExpenseFormType } from '@models/expense';

const useUpdateExpense = (id: string | undefined) => {
  const { showToast } = useToast();
  return useMutation({
    mutationFn: (data: ExpenseFormType) => updateExpenseData(id, data),
    onSuccess: () => {
      showToast('수정했습니다.');
    },
    onError: (error) => {
      alert('다시 시도해주세요.');
      console.error(`저장 실패: ${error}`);
    },
  });
};

export default useUpdateExpense;
