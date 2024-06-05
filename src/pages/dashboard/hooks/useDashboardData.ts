import { useQuery } from 'react-query';
import { fetchDashboardData } from '@service/dashboard';
import { formatYMD } from '@utils/index';
import type { Register } from '@models/index';
import type { TabOption } from './../type';

import useIsDemoMode from '@hooks/useIsDemo';

const useDashboardData = (currentDate: Date, selectedTab: TabOption, registerType: Register) => {
  const selectDate = formatYMD(currentDate, 'none');
  const isDemoMode = useIsDemoMode();

  const { data, isLoading, error } = useQuery(
    ['fetchDashboardDataQueryKey', currentDate.getMonth(), selectedTab],
    () => fetchDashboardData(selectDate, registerType),
    {
      enabled: !isDemoMode,
      refetchOnWindowFocus: false, // 윈도우 포커스 시, 자동 새로고침 방지
    },
  );

  const rtnData = isDemoMode
    ? { dailyAmount: [], emotionAmountTotal: [], satisfactionAverage: 0 }
    : data;

  return {
    data: rtnData,
    isLoading,
    error,
  };
};
export default useDashboardData;
