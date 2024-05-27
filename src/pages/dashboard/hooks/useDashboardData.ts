import { useQuery } from 'react-query';
import { fetchDashboardData } from '@api/dashboardAPI';

import { formatYMD } from '@utils/index';
import type { Register } from '@models/index';
import type { TabOption } from '../type';

const useDashboardData = (currentDate: Date, selectedTab: TabOption, registerType: Register) => {
  const selectDate = formatYMD(currentDate, 'none');
  return useQuery(
    ['fetchDashboardDataQueryKey', currentDate.getMonth(), selectedTab],
    () => fetchDashboardData(selectDate, registerType),
    {
      refetchOnWindowFocus: false, // 윈도우 포커스 시, 자동 새로고침 방지
    },
  );
};
export default useDashboardData;
