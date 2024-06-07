import { useMemo } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { saveExpenseData } from '@service/expense';

import useToast from '@hooks/useToast';
import { getExpenseDetailViewPath } from '@models/navigation';
import type { ExpenseDetailDataType } from '@service/expense/types';

const useSaveExpense = (isDemoMode: boolean) => {
  const { showToast } = useToast();
  const navigate = useNavigate();

  const expenseSaveMutation = useMutation(saveExpenseData, {
    onSuccess: (data) => {
      const articleId = data.articleId;
      showToast('저장했습니다.');
      console.log('저장 성공: ' + articleId);

      navigate(`${getExpenseDetailViewPath(articleId)}?prev=add`);
    },
    onError: (error) => {
      alert('다시 시도해주세요.');
      console.error('저장 실패: ' + error);
    },
  });

  // 임시 함수 (소비 수정)
  const demoMutate = useMemo(() => {
    return {
      mutate: (data: ExpenseDetailDataType) => {
        alert(`demo add save: ${JSON.stringify(data)}`);
      },
      isLoading: false,
    };
  }, []);

  if (isDemoMode) return demoMutate;
  return expenseSaveMutation;
};

export default useSaveExpense;
