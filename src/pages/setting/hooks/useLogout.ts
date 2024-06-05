import { useMutation } from 'react-query';
import { logoutUser } from '@service/user';

import useToast from '@hooks/useToast';
import { useAuthStore } from '@stores/authStore';

const useLogout = () => {
  const { showToast } = useToast();
  const handleLogout = (isLogoutDemo: boolean = false) => {
    useAuthStore.getState().setLogoutState();
    if (isLogoutDemo) {
      // 로컬 데이터 초기화 넣기? (GoLogin.tsx, useLogout.ts)
      showToast('체험하기가 종료되었습니다.');
    } else {
      showToast('로그아웃되었습니다.');
    }
  };
  const logoutMutation = useMutation(logoutUser, {
    onSuccess: (data) => {
      handleLogout();
      console.log(`로그아웃 성공 : ${JSON.stringify(data)}`);
    },
    onError: (error) => {
      showToast('로그아웃에 실패했습니다.');
      console.error(`로그아웃 실패: ${error}`);
    },
  });

  return {
    handleLogout,
    logoutMutation,
  };
};

export default useLogout;
