import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { AuthStoreType } from '@models/auth';

export const useAuthStore = create(
  persist<AuthStoreType>(
    (set) => ({
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
    }),
    {
      name: 'auth-state',
      getStorage: () => localStorage,
    },
  ),
);
