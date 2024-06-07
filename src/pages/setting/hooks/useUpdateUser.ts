import { useMemo } from 'react';
import { useMutation } from 'react-query';
import { saveUserData } from '@service/user';
import useToast from '@hooks/useToast';
import type { UserFormType } from '@models/user';

const useUpdateUser = (isDemoMode: boolean) => {
  const { showToast } = useToast();
  const userSaveMutation = useMutation(saveUserData, {
    onSuccess: (data) => {
      showToast('저장했습니다.');
      console.log(`유저 저장 성공 : ${JSON.stringify(data)}`);
    },
    onError: (error) => {
      alert('다시 시도해주세요.');
      console.error(`유저 저장 실패: ${error}`);
    },
  });

  // 임시 함수 (유저 저장)
  const demoMutate = useMemo(() => {
    return {
      mutate: (data: UserFormType) => {
        alert(`demo user save: ${JSON.stringify(data)}`);
      },
      isLoading: false,
    };
  }, []);
  if (isDemoMode) return demoMutate;
  return userSaveMutation;
};

export default useUpdateUser;
