import { useMutation } from 'react-query';
import { deleteExpenseById } from '@service/expenseAPI';

import useToast from '@hooks/useToast';

const useDeleteExpense = (id: string | undefined, handleMovePrevPage: () => void) => {
  const { showToast } = useToast();
  return useMutation(deleteExpenseById, {
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
};

export default useDeleteExpense;
