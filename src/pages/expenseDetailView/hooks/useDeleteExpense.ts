import { useMemo } from 'react';
import { useMutation } from 'react-query';
import { deleteExpenseById } from '@service/expense';

import useToast from '@hooks/useToast';

const useDeleteExpense = (
  id: string | undefined,
  isDemoMode: boolean,
  handleMovePrevPage: () => void,
) => {
  const { showToast } = useToast();

  const deleteMutate = useMutation(deleteExpenseById, {
    onSuccess: () => {
      handleMovePrevPage();
      showToast('삭제했습니다.');
      console.log(`삭제 성공 : ${id}`);
    },
    onError: (error) => {
      alert('다시 시도해주세요.');
      console.error(`삭제 실패: ${error}`);
    },
  });

  // 임시 함수 (소비 삭제)
  const demoMutate = useMemo(() => {
    return {
      mutate: (id: string | undefined) => {
        alert(`demo delete: articleID = ${JSON.stringify(id)}`);
        handleMovePrevPage();
      },
      isLoading: false,
    };
  }, [handleMovePrevPage]);

  if (isDemoMode) return demoMutate;
  return deleteMutate;
};

export default useDeleteExpense;
