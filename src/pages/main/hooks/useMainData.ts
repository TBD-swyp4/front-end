import { useQuery } from 'react-query';

import { fetchMainData } from '@service/main';
import { formatYMD } from '@utils/index';

import type { MainDataType, MainSubDataType } from '@service/main/types';

const useMainData = (currentDate: Date, isDemoMode: boolean) => {
  const selectDate = formatYMD(currentDate, 'none');

  // Main Data : 예산, 월 작성 리스트
  // 메인 데이터는 "월" 이 바뀌면 재로딩
  const {
    data: mainData,
    isLoading: isLoadingMainData,
    error: mainDataError,
  } = useQuery<MainDataType>(
    ['fetchMainDataQueryKey', currentDate.getMonth()],
    () => fetchMainData<MainDataType>(selectDate),
    {
      enabled: !!selectDate && !isDemoMode,
      refetchOnWindowFocus: false, // 윈도우 포커스 시, 자동 새로고침 방지
    },
  );

  // Sub Data : 선택 날짜의 작성 요약 리스트
  const {
    data: subData,
    isLoading: isLoadingSubData,
    error: subDataError,
  } = useQuery<MainSubDataType>(
    ['fetchMainSubDataQueryKey', selectDate],
    () => fetchMainData<MainSubDataType>(selectDate, true),
    {
      enabled: !!selectDate && !isDemoMode,
      refetchOnWindowFocus: false, // 윈도우 포커스 시, 자동 새로고침 방지
    },
  );

  // Handling demo mode
  const rtnMainData = isDemoMode ? { budget: 0, monthSpendList: [], daySpendList: [] } : mainData;
  const rtnSubData = isDemoMode ? { daySpendList: [] } : subData;

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
