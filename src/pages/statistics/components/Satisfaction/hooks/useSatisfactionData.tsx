import { useQuery } from 'react-query';

import {
  fetchSatisfactionByGender,
  fetchSatisfactionByMbti,
} from '@service/statistics/satisfactionService';

import type { Register } from '@models/index';
import type { TabOption } from '../../../type';

const useSatisfactionData = (tabOption: TabOption, register: Register) => {
  const { data: mbtiData, isLoading: isMbtiDataLoading } = useQuery(
    ['fetchSatisfactionByMbti', register],
    () => fetchSatisfactionByMbti(register),
    {
      enabled: tabOption === 'TAB_MBTI',
    },
  );
  const { data: genderData, isLoading: isGenderDataLoading } = useQuery(
    ['fetchSatisfactionByGender', register],
    () => fetchSatisfactionByGender(register),
    {
      enabled: tabOption === 'TAB_GENDER',
    },
  );

  return { mbtiData, genderData, isLoading: isMbtiDataLoading || isGenderDataLoading };
};

export default useSatisfactionData;
