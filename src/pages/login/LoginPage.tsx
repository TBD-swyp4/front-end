import styled from 'styled-components';
import { useAuthStore } from '@stores/authStore';
import { Navigate } from 'react-router-dom';
import LogoIcon from '@assets/images/icon/logo.svg?react';
import LogoTitleIcon from '@assets/images/icon/logoTitle.svg?react';
import SocialLogin from './components/socialLogin';

const LoginPage = () => {
  // #20240501.syjang, 이미 로그인된 상태라면 메인 페이지로 보낸다.
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <LoginContainer>
      <LogoWrapper>
        <Logo />
        <LogoTitle />
      </LogoWrapper>
      <LoginButtonContainer>
        <SocialLogin provider={'kakao'} />
        <SocialLogin provider={'naver'} />
        {/* <SocialLogin provider={'google'} /> */}
      </LoginButtonContainer>
      <ExperienceWrapper>
        <ExperienceButton>체험하기</ExperienceButton>
      </ExperienceWrapper>
    </LoginContainer>
  );
};

export default LoginPage;

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  color: ${(props) => props.theme.colors.font};

  background-color: ${(props) => props.theme.colors.background};
  width: 100%;
  height: 100%;

  padding-top: 50px;
  padding: 10px;
`;

const LogoWrapper = styled.div`
  width: 100%;
  height: 45%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Logo = styled(LogoIcon)`
  width: 100px;
  height: 100px;
`;

const LogoTitle = styled(LogoTitleIcon)`
  width: 86px;
  height: 24px;
`;

const LoginButtonContainer = styled.div`
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

const ExperienceButton = styled.button`
  width: 350px;
  height: 35%;
  border-radius: 6px;
  background-color: ${(props) => props.theme.colors.button};
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 500;
  font-size: 18px;
  color: white;
`;
