import { useQuery } from 'react-query';
import { fetchUserData } from '@service/userAPI';

import useIsDemoMode from '@hooks/useIsDemo';

const useUserData = () => {
  const isDemoMode = useIsDemoMode();

  return useQuery(['fetchUserDataQueryKey'], () => fetchUserData(), {
    enabled: !isDemoMode,
    refetchOnWindowFocus: false, // 윈도우 포커스 시, 자동 새로고침 방지
  });
};
export default useUserData;
