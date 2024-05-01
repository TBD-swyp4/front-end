import styled from 'styled-components';
import NaverLogin from './naverLogin/NaverLogin';
import { useAuthStore } from '@stores/authStore';
import { Navigate } from 'react-router-dom';

const LoginPage = () => {
  // #20240501.syjang, 이미 로그인된 상태라면 메인 페이지로 보낸다.
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <LoginWrapper>
      <BrandWrapper></BrandWrapper>
      <LoginButtonWrapper>
        <NaverLogin></NaverLogin>
        <NaverLogin></NaverLogin>
        <NaverLogin></NaverLogin>
      </LoginButtonWrapper>
      <ExperienceWrapper>체험하기</ExperienceWrapper>
    </LoginWrapper>
  );
};

export default LoginPage;

const LoginWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  color: ${(props) => props.theme.fontColor};

  background-color: white;
  width: 100%;
  height: 100%;

  margin-top: 50px;
  padding: 10px;
`;

const BrandWrapper = styled.div`
  background-color: #ece0e2;
  width: 100%;
  height: 45%;
`;
const LoginButtonWrapper = styled.div`
  background-color: transparent;
  width: 100%;
  height: 35%;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;
const ExperienceWrapper = styled.div`
  background-color: transparent;
  width: 100%;
  height: 20%;

  text-align: center;
`;
