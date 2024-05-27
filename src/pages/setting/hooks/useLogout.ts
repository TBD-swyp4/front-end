import { useMutation } from 'react-query';
import { logoutUser } from '@api/userAPI';

import useToast from '@hooks/useToast';
import { useAuthStore } from '@stores/authStore';

const useLogout = () => {
  const { showToast } = useToast();
  return useMutation(logoutUser, {
    onSuccess: (data) => {
      window.localStorage.removeItem('access_token');
      useAuthStore.getState().setLogoutState();

      showToast('로그아웃되었습니다.');
      console.log(`로그아웃 성공 : ${JSON.stringify(data)}`);
    },
    onError: (error) => {
      showToast('로그아웃에 실패했습니다.');
      console.error(`로그아웃 실패: ${error}`);
    },
  });
};

export default useLogout;
