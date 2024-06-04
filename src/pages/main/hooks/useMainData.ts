import { useQuery } from 'react-query';
import { fetchMainData } from '@service/mainAPI';
import { formatYMD } from '@utils/index';

import useIsDemoMode from '@hooks/useIsDemo';

const useMainData = (currentDate: Date) => {
  const selectDate = formatYMD(currentDate, 'none');
  const isDemoMode = useIsDemoMode();

  // Main Data : 예산, 월 작성 리스트
  // 메인 데이터는 "월" 이 바뀌면 재로딩
  const {
    data: mainData,
    isLoading: isLoadingMainData,
    error: mainDataError,
  } = useQuery(['fetchMainDataQueryKey', currentDate.getMonth()], () => fetchMainData(selectDate), {
    enabled: !!selectDate && !isDemoMode,
    refetchOnWindowFocus: false, // 윈도우 포커스 시, 자동 새로고침 방지
  });

  // Sub Data : 선택 날짜의 작성 요약 리스트
  const {
    data: subData,
    isLoading: isLoadingSubData,
    error: subDataError,
  } = useQuery(['fetchMainSubDataQueryKey', selectDate], () => fetchMainData(selectDate, true), {
    enabled: !!selectDate && !isDemoMode,
    refetchOnWindowFocus: false, // 윈도우 포커스 시, 자동 새로고침 방지
  });

  // Handling demo mode
  const rtnMainData = isDemoMode ? { data: [] } : mainData;
  const rtnSubData = isDemoMode ? { data: [] } : subData;

  return {
    mainData: rtnMainData,
    isLoadingMainData,
    mainDataError,
    subData: rtnSubData,
    isLoadingSubData,
    subDataError,
  };
};
export default useMainData;
