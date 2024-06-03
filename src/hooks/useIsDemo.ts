import { useAuthStore } from '@stores/authStore';
import { UserStatus } from '@models/user';

const useIsDemoMode = (): boolean => {
  const userStatus = useAuthStore((state) => state.userStatus);
  return userStatus === UserStatus.Demo;
};

export default useIsDemoMode;
