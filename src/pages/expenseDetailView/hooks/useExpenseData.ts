import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { fetchExpenseById } from '@service/expense';
import type { ExpenseDetailDataType } from '@service/expense/types';

const useExpenseData = (id: string | undefined, isDemoMode: boolean) => {
  const { data, isLoading, error } = useQuery<ExpenseDetailDataType>(
    ['fetchExpenseByIdQueryKey'],
    () => fetchExpenseById(id),
    {
      enabled: !!id && !isDemoMode, // id가 있을 때만 쿼리 실행
      refetchOnWindowFocus: false, // 윈도우 포커스 시, 자동 새로고침 방지
    },
  );

  // 임시 데이터 : 렌더링 시 한번만 객체를 생성하기 위해 useMemo 사용
  const demoData: ExpenseDetailDataType = useMemo(
    () => ({
      content: '',
      emotion: 'EVADED',
      amount: '',
      satisfaction: 3,
      registerType: 'SPEND',
      spendDate: '',
      event: '',
      thought: '',
      reason: '',
      improvements: '',
    }),
    [],
  );
  const rtnData = isDemoMode ? demoData : data;

  return {
    data: rtnData,
    isLoading,
    error,
  };
};

export default useExpenseData;
