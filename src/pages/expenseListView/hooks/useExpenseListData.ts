import { useInfiniteQuery } from 'react-query';
import { fetchExpensesByCondition } from '@api/expenseAPI';
import { ExpenseFilterType } from '@models/expense';

const useExpenseListData = (condition: ExpenseFilterType) => {
  // 무한 스크롤 구현, 데이터 정렬은 최신순 고정(서버에서 그렇게 보내줌)
  return useInfiniteQuery(
    ['expenses', condition],
    ({ pageParam = 1 }) => fetchExpensesByCondition(pageParam, condition),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.data.nextPage) {
          return allPages.length + 1;
        } else {
          return undefined;
        }
      },
      onSuccess: (data) => {
        console.log('ExpensesByCondition Fetched data:', data);
      },
      onError: (error) => {
        alert('다시 시도해주세요.');
        console.error('Error fetching data:', error);
      },
      refetchOnWindowFocus: false, // 윈도우 포커스 시, 자동 새로고침 방지
    },
  );
};

export default useExpenseListData;
