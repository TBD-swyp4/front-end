import styled from 'styled-components';
import NaverLogin from './naverLogin/NaverLogin';
import { useAuthStore } from '@stores/authStore';
import { Navigate } from 'react-router-dom';

import LogoIcon from '@assets/images/icon/logoGreen.svg?react';

import { flexCenter, flexColumnCenter } from '@styles/CommonStyles';

const LoginPage = () => {
  // #20240501.syjang, 이미 로그인된 상태라면 메인 페이지로 보낸다.
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <LoginContainer>
      <LogoWrapper>
        <Logo></Logo>
      </LogoWrapper>
      <LoginButtonContainer>
        <NaverLogin></NaverLogin>
        <NaverLogin></NaverLogin>
        <NaverLogin></NaverLogin>
      </LoginButtonContainer>
      <ExperienceWrapper>
        <ExperienceButton>체험하기</ExperienceButton>
      </ExperienceWrapper>
    </LoginContainer>
  );
};

export default LoginPage;

const LoginContainer = styled.div`
  ${flexColumnCenter}

  color: ${(props) => props.theme.colors.font};

  background-color: ${(props) => props.theme.colors.background};
  width: 100%;
  height: 100%;

  padding-top: 50px;
  padding: 10px;
`;

const LogoWrapper = styled.div`
  ${flexCenter}
  width: 100%;
  height: 45%;
`;

const Logo = styled(LogoIcon)`
  width: 300px;
  height: 300px;
`;

const LoginButtonContainer = styled.div`
  ${flexColumnCenter}
  background-color: transparent;
  width: 100%;
  height: 35%;
`;
const ExperienceWrapper = styled.div`
  background-color: transparent;
  width: 100%;
  height: 20%;
  text-align: center;
`;

const ExperienceButton = styled.button`
  width: 350px;
  height: 80px;
  background-color: ${(props) => props.theme.colors.button};
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: medium;
  font-size: 18px;
  color: white;
`;
