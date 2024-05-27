import { create } from 'zustand';

type Toast = {
  id: number;
  message: string;
  isVisible: boolean; // fadeout css 효과를 위한 상태
};

type ToastStoreType = {
  toasts: Toast[];
  addToast: (message: string) => number;
  removeToast: (id: number) => void;
  fadeOutToast: (id: number) => void;
};

export const useToastStore = create<ToastStoreType>((set) => ({
  toasts: [],
  addToast: (message) => {
    const id = Math.random();
    set((state) => {
      return {
        toasts: [...state.toasts, { id, message, isVisible: true }],
      };
    });
    return id;
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
  fadeOutToast: (id) =>
    set((state) => ({
      toasts: state.toasts.map((toast) =>
        toast.id === id ? { ...toast, isVisible: false } : toast,
      ),
    })),
}));
