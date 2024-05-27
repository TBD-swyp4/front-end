import { useQuery } from 'react-query';
import { fetchUserData } from '@api/userAPI';

const useUserData = () => {
  return useQuery(['fetchUserDataQueryKey'], () => fetchUserData(), {
    refetchOnWindowFocus: false, // 윈도우 포커스 시, 자동 새로고침 방지
  });
};
export default useUserData;
