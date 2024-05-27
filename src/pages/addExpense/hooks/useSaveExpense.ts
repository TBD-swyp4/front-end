import { useMutation } from 'react-query';
import { saveExpenseData } from '@api/expenseAPI';

import { useNavigate } from 'react-router-dom';
import useToast from '@hooks/useToast';

const useSaveExpense = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();

  return useMutation(saveExpenseData, {
    onSuccess: (data) => {
      const articleId = data.articleId;
      showToast('저장했습니다.');
      console.log('저장 성공: ' + articleId);
      navigate(`/expense/${articleId}?prev=add`);
    },
    onError: (error) => {
      alert('다시 시도해주세요.');
      console.error('저장 실패: ' + error);
    },
  });
};

export default useSaveExpense;
