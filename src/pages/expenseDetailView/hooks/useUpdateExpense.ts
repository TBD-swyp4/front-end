import { useMemo } from 'react';
import { useMutation } from 'react-query';
import { updateExpenseData } from '@service/expense';

import useToast from '@hooks/useToast';
import type { ExpenseDetailDataType } from '@service/expense/types';

const useUpdateExpense = (id: string | undefined, isDemoMode: boolean) => {
  const { showToast } = useToast();

  const updateMutation = useMutation({
    mutationFn: (data: ExpenseDetailDataType) => updateExpenseData(id, data),
    onSuccess: () => {
      showToast('수정했습니다.');
    },
    onError: (error) => {
      alert('다시 시도해주세요.');
      console.error(`저장 실패: ${error}`);
    },
  });

  // 임시 함수 (소비 수정)
  const demoMutate = useMemo(() => {
    return {
      mutate: (data: ExpenseDetailDataType) => {
        alert(`demo update: ${JSON.stringify(data)}`);
      },
      isLoading: false,
    };
  }, []);

  if (isDemoMode) return demoMutate;
  return updateMutation;
};

export default useUpdateExpense;
