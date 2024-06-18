import { useQuery } from 'react-query';

import {
  fetchWordFrequencyByGender,
  fetchWordFrequencyByMbti,
} from '@service/statistics/frequencyService';

import type { Register } from '@models/index';
import type { TabOption } from '../../../type';

const useMemoData = (tabOption: TabOption, register: Register) => {
  const { data: mbtiData, isLoading: isMbtiDataLoading } = useQuery(
    ['fetchWordFrequencyByMbti', register],
    () => fetchWordFrequencyByMbti(register),
    {
      enabled: tabOption === 'TAB_MBTI',
    },
  );
  const { data: genderData, isLoading: isGenderDataLoading } = useQuery(
    ['fetchWordFrequencyByGender', register],
    () => fetchWordFrequencyByGender(register),
    {
      enabled: tabOption === 'TAB_GENDER',
    },
  );

  return { mbtiData, genderData, isLoading: isMbtiDataLoading || isGenderDataLoading };
};

export default useMemoData;
