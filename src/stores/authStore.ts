import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserStatus, type UserStatusType } from '@models/user';

type AuthStoreType = {
  userStatus: UserStatusType;
  setLoginState: () => void;
  setLogoutState: () => void;
  setDemoState: () => void;
};

export const useAuthStore = create(
  persist<AuthStoreType>(
    (set) => ({
      userStatus: UserStatus.LoggedOut,
      setLoginState: () =>
        set(() => ({
          userStatus: UserStatus.LoggedIn,
        })),
      setLogoutState: () => {
        // 로컬스토리지 access_token 삭제
        window.localStorage.removeItem('access_token');
        set(() => ({
          userStatus: UserStatus.LoggedOut,
        }));
      },
      setDemoState: () => {
        // 필요하면 상태 로컬스토리지에 저장하기
        // window.localStorage.setItem('demo_mode', 'true');
        set(() => ({
          userStatus: UserStatus.Demo,
        }));
      },
    }),
    {
      name: 'auth-state',
      getStorage: () => localStorage,
    },
  ),
);

// 로컬스토리지에 이전에 저장한 토큰이 존재한다면, login state
const initializeUser = () => {
  if (import.meta.env.MODE === 'development') {
    // demo mode 개발로 주석처리
    //useAuthStore.getState().setLoginState();
  } else {
    const accessToken = window.localStorage.getItem('access_token');
    if (accessToken) {
      useAuthStore.getState().setLoginState();
    } else {
      // 토큰 없으면 서비스 오픈 시 무조건 로그아웃 스테이트가 맞음
      useAuthStore.getState().setLogoutState();
    }
  }
};
initializeUser();
