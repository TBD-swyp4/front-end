import { useToastStore } from '@stores/toastStore';

const useToast = () => {
  const addToast = useToastStore((state) => state.addToast);
  const removeToast = useToastStore((state) => state.removeToast);
  const fadeOutToast = useToastStore((state) => state.fadeOutToast);

  return {
    showToast: (message: string, duration = 1500) => {
      const id = addToast(message);
      setTimeout(() => {
        // 메시지 fadeout 효과 주기
        fadeOutToast(id);
        setTimeout(() => {
          // fadeout 적용 0.5초 후 리스트에서 자동 제거
          removeToast(id);
        }, 500);
      }, duration);
    },
  };
};

export default useToast;
