import { useQuery } from 'react-query';
import { fetchDashboardData } from '@service/dashboard/dashboardService';
import { useDemoStore } from '@stores/demoStore';

import { formatYMD } from '@utils/dateUtils';
import type { Register } from '@models/index';
import type { DashboardDataType } from '@service/dashboard/types';
import { DashboardTabOption } from '../type';

const useDashboardData = (
  currentDate: Date,
  selectedTab: DashboardTabOption,
  registerType: Register,
  isDemoMode: boolean,
) => {
  const selectDate = formatYMD(currentDate, 'none');

  const {
    data: dashboardData,
    isLoading,
    error,
  } = useQuery<DashboardDataType>(
    ['fetchDashboardDataQueryKey', currentDate.getMonth(), selectedTab],
    () => fetchDashboardData(selectDate, registerType),
    {
      enabled: !isDemoMode,
      refetchOnWindowFocus: false, // 윈도우 포커스 시, 자동 새로고침 방지
    },
  );
  const demoDashboardData = useDemoStore((state) => state.getDemoDashboardData)(
    selectDate,
    registerType,
  );

  return {
    data: isDemoMode ? demoDashboardData : dashboardData,
    isLoading,
    error,
  };
};
export default useDashboardData;
