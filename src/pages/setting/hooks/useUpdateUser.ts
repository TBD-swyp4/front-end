import { useMutation } from 'react-query';
import { saveUserData } from '@service/user';
import useToast from '@hooks/useToast';

const useUpdateUser = () => {
  const { showToast } = useToast();
  return useMutation(saveUserData, {
    onSuccess: (data) => {
      showToast('저장했습니다.');
      console.log(`유저 저장 성공 : ${JSON.stringify(data)}`);
    },
    onError: (error) => {
      alert('다시 시도해주세요.');
      console.error(`유저 저장 실패: ${error}`);
    },
  });
};

export default useUpdateUser;
