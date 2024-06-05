import { useMemo } from 'react';

import { useQuery } from 'react-query';
import { fetchUserData } from '@service/user';
import type { UserSettingDataType } from '@service/user/types';

import useIsDemoMode from '@hooks/useIsDemo';

const useUserData = () => {
  const isDemoMode = useIsDemoMode();

  const {
    data: data,
    isLoading: isLoadingUserData,
    error,
  } = useQuery<UserSettingDataType>(['fetchUserDataQueryKey'], () => fetchUserData(), {
    enabled: !isDemoMode,
    refetchOnWindowFocus: false, // 윈도우 포커스 시, 자동 새로고침 방지
  });

  // 렌더링 시 한번만 객체를 생성하기 위해 useMemo 사용
  const demoData: UserSettingDataType = useMemo(
    () => ({
      email: '',
      mbti: 'ISTP',
      gender: 'MALE',
      budget: 0,
    }),
    [],
  );

  const rtnData = isDemoMode ? demoData : data;

  return {
    userData: rtnData,
    isLoadingUserData,
    error,
  };
};
export default useUserData;
