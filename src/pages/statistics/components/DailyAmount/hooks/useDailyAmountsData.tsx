import { useQuery } from 'react-query';

import {
  fetchDailyAmountsByGender,
  fetchDailyAmountsByMbti,
} from '@service/statistics/dailyAmountService';

import type { Register } from '@models/index';
import type { TabOption } from '../../../type';

const useDailyAmountsData = (tabOption: TabOption, register: Register) => {
  const { data: mbtiData, isLoading: isMbtiDataLoading } = useQuery(
    ['fetchDailyAmountsByMbti', register],
    () => fetchDailyAmountsByMbti(register),
    {
      enabled: tabOption === 'TAB_MBTI',
    },
  );
  const { data: genderData, isLoading: isGenderDataLoading } = useQuery(
    ['fetchDailyAmountsByGender', register],
    () => fetchDailyAmountsByGender(register),
    {
      enabled: tabOption === 'TAB_GENDER',
    },
  );

  return { mbtiData, genderData, isLoading: isMbtiDataLoading || isGenderDataLoading };
};

export default useDailyAmountsData;
