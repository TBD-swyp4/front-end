import { useAuthStore } from '@stores/authStore';
import { Navigate } from 'react-router-dom';

const AuthPage = () => {
  // 서버에서 인증 받아서 돌아오는 페이지.
  // 정상적으로 redirect 되었으면 로그인 상태로 업데이트 시켜준다.
  useAuthStore.getState().setLoginState();
  return <Navigate to="/" />;
};

export default AuthPage;
