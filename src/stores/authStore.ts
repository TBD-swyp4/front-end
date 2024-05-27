import { create } from 'zustand';
import { persist } from 'zustand/middleware';

//type UserLoginStatus = 'LoggedIn' | 'Trial' | 'LoggedOut';

type AuthStoreType = {
  isLoggedIn: boolean;
  setLoginState: () => void;
  setLogoutState: () => void;
};

export const useAuthStore = create(
  persist<AuthStoreType>(
    (set) => ({
      isLoggedIn: false,

      setLoginState: () =>
        set(() => ({
          isLoggedIn: true,
        })),

      setLogoutState: () =>
        set(() => ({
          isLoggedIn: false,
        })),
    }),
    {
      name: 'auth-state',
      getStorage: () => localStorage,
    },
  ),
);

// 로컬스토리지에 이전에 저장한 토큰이 존재한다면, login state로 변경
const initializeUser = () => {
  if (import.meta.env.MODE === 'development') {
    useAuthStore.getState().setLoginState();
  } else {
    const accessToken = window.localStorage.getItem('access_token');
    accessToken
      ? useAuthStore.getState().setLoginState()
      : useAuthStore.getState().setLogoutState();
  }
};
initializeUser();
