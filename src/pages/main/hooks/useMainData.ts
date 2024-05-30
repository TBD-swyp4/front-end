import { useQuery } from 'react-query';
import { fetchMainData } from '@api/mainAPI';
import { formatYMD } from '@utils/index';

const useMainData = (currentDate: Date) => {
  const selectDate = formatYMD(currentDate, 'none');

  // Main Data : 예산, 월 작성 리스트
  // 메인 데이터는 "월" 이 바뀌면 재로딩
  const {
    data: mainData,
    isLoading: isLoadingMainData,
    error: mainDataError,
  } = useQuery(['fetchMainDataQueryKey', currentDate.getMonth()], () => fetchMainData(selectDate), {
    enabled: !!selectDate,
    refetchOnWindowFocus: false, // 윈도우 포커스 시, 자동 새로고침 방지
  });

  // Sub Data : 선택 날짜의 작성 요약 리스트
  const {
    data: subData,
    isLoading: isLoadingSubData,
    error: subDataError,
  } = useQuery(['fetchMainSubDataQueryKey', selectDate], () => fetchMainData(selectDate, true), {
    enabled: !!selectDate,
    refetchOnWindowFocus: false, // 윈도우 포커스 시, 자동 새로고침 방지
  });

  return {
    mainData,
    isLoadingMainData,
    mainDataError,
    subData,
    isLoadingSubData,
    subDataError,
  };
};
export default useMainData;
