import { useMemo } from 'react';
import { useMutation } from 'react-query';
import { logoutUser } from '@service/user';

import useToast from '@hooks/useToast';
import { useAuthStore } from '@stores/authStore';

const useLogout = (isDemoMode: boolean) => {
  const { showToast } = useToast();

  const logoutMutation = useMutation(logoutUser, {
    onSuccess: (data) => {
      useAuthStore.getState().setLogoutState();
      showToast('로그아웃되었습니다.');
      console.log(`로그아웃 성공 : ${JSON.stringify(data)}`);
    },
    onError: (error) => {
      showToast('로그아웃에 실패했습니다.');
      console.error(`로그아웃 실패: ${error}`);
    },
  });

  // 임시 함수 (유저 저장)
  const demoMutate = useMemo(() => {
    return {
      mutate: () => {
        useAuthStore.getState().setLogoutState();
        // 로컬 데이터 초기화 넣기? (GoLogin.tsx, useLogout.ts)
        showToast('체험하기가 종료되었습니다.');
      },
    };
  }, [showToast]);

  if (isDemoMode) return demoMutate;
  return logoutMutation;
};

export default useLogout;
