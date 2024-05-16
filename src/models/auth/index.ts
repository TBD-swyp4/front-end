// #20240429.syjang, 예시입니다. 추후 변경 가능합니다.

export type UserLoginStatus = 'LoggedIn' | 'Trial' | 'LoggedOut';
export type authState = {
  isLoggedIn: boolean;
};
export type AuthStoreType = authState & {
  setLoginState: () => void;
  setLogoutState: () => void;
};
