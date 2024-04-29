import { create } from 'zustand';
import { AuthStoreType } from '../types/authType';

export const useAuthStore = create<AuthStoreType>((set) => ({
  isLoggedIn: false,
  userId: null,

  setLoginState: () =>
    set(() => ({
      isLoggedIn: true,
    })),

  setLogoutState: () =>
    set(() => ({
      isLoggedIn: false,
    })),

  setUserId: (id) => set({ userId: id }),
}));

// #20240429.syjang, 예시임, 나중에 로그인 토큰 어디에 저장할지에 따라 다름. 우선 false로 return
function initializeUser() {
  //const accessToken = localStorage.getItem('access_Token');
  //accessToken ? useAuthStore.getState().setLoginState() : useAuthStore.getState().setLogoutState();
  useAuthStore.getState().setLogoutState();
}

initializeUser();
