import { useQuery } from 'react-query';
import { fetchExpenseById } from '@service/expenseAPI';

const useExpenseData = (id: string | undefined) => {
  return useQuery(['fetchExpenseByIdQuertKey'], () => fetchExpenseById(id), {
    enabled: !!id, // id가 있을 때만 쿼리 실행
    refetchOnWindowFocus: false, // 윈도우 포커스 시, 자동 새로고침 방지
  });
};

export default useExpenseData;
