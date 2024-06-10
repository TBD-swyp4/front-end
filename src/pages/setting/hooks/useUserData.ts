import { useQuery } from 'react-query';
import { fetchUserData } from '@service/user';
import type { UserSettingDataType } from '@service/user/types';
import { useDemoStore } from '@stores/demoStore';

const useUserData = (isDemoMode: boolean) => {
  const {
    data: userData,
    isLoading: isLoadingUserData,
    error,
  } = useQuery<UserSettingDataType>(['fetchUserDataQueryKey'], () => fetchUserData(), {
    enabled: !isDemoMode,
    refetchOnWindowFocus: false, // 윈도우 포커스 시, 자동 새로고침 방지
  });

  // 체험하기 모드 데이터
  const demoUserData = useDemoStore((state) => state.userSettings);

  const rtnData = isDemoMode ? demoUserData : userData;

  return {
    userData: rtnData,
    isLoadingUserData,
    error,
  };
};
export default useUserData;
