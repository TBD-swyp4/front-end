import { useMutation } from 'react-query';
import { saveUserData } from '@service/user';
import useToast from '@hooks/useToast';
import type { UserFormType } from '@models/user';
import { useDemoStore } from '@stores/demoStore';

const useSaveUserData = (isDemoMode: boolean) => {
  const { showToast } = useToast();
  const setDemoUserSetting = useDemoStore((state) => state.setDemoUserSetting); // 체험하기용

  const userSaveMutation = useMutation(saveUserData, {
    onSuccess: (data) => {
      showToast('저장했습니다.');
      console.log(`유저 데이터 저장 성공 : ${JSON.stringify(data)}`);
    },
    onError: (error) => {
      alert('다시 시도해주세요.');
      console.error(`유저 데이터 저장 실패: ${error}`);
    },
  });

  // 체험하기 모드 예산 저장 로직
  const demoUserSaveMutaion = {
    mutate: (data: UserFormType) => {
      setDemoUserSetting(Number(data.budget));
      showToast('저장했습니다.');
      console.log(`demo user save: ${JSON.stringify(data)}`);
    },
    isLoading: false,
  };
  if (isDemoMode) return demoUserSaveMutaion;
  return userSaveMutation;
};

export default useSaveUserData;
