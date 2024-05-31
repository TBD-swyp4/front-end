import styled from 'styled-components';
import { flexColumnCenter } from '@styles/CommonStyles';

import { Navigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '@stores/authStore';

import MetaThemeColor from '@components/background/MetaThemeColor';

import SwipeContainer from './components/SwipeContainer';
import LoginButtonContainer from './components/LoginButtonContainer';

const LoginPage = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const [searchParams] = useSearchParams();
  const isLoginFail = searchParams.get('isLoginFail');

  // #20240501.syjang, 이미 로그인된 상태라면 메인 페이지로 보낸다.
  if (isLoggedIn) return <Navigate to="/" />;

  if (isLoginFail === 'true') alert('로그인에 실패했습니다. 다시 시도해주세요.');

  return (
    <LoginContainer>
      <MetaThemeColor color="#F4F4F4" />
      <SwipeContainer />
      <LoginButtonContainer />
    </LoginContainer>
  );
};

export default LoginPage;

const LoginContainer = styled.div`
  ${flexColumnCenter}
  width: 100%;
  height: 100%;

  color: #bcbcbc;
  background-color: ${(props) => props.theme.colors.background};
`;
