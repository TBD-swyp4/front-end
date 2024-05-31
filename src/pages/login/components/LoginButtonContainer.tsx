import { flexColumnCenter } from '@styles/CommonStyles';
import styled from 'styled-components';

import LoginBird from '@assets/images/bird/loginBird.svg?react';
import kakaoImg from '@assets/images/login/kakao.png';
import naverImg from '@assets/images/login/naver.png';
import googleImg from '@assets/images/login/google.png';

const LoginButtonContainer = () => {
  const AUTH_URL = `https://www.api-spinlog.shop/api/users/login`;

  return (
    <Container>
      <Button href={`${AUTH_URL}/kakao`}>
        <Bird />
        <Img src={kakaoImg} />
      </Button>
      <Button href={`${AUTH_URL}/naver`}>
        <Img src={naverImg} />
      </Button>
      <Button href={`${AUTH_URL}/google`}>
        <Img src={googleImg} />
      </Button>
      {/* <ExperienceWrapper>
        <ExperienceButton>체험하기</ExperienceButton>
      </ExperienceWrapper> */}
    </Container>
  );
};

export default LoginButtonContainer;

const Container = styled.div`
  ${flexColumnCenter}
  background-color:transparent;
  width: 100%;
  height: 40%;
  gap: 12px;
`;

const Button = styled.a`
  width: 358px;
  height: 60px;

  position: relative;
  overflow: visible;
  z-index: 1;

  cursor: pointer;

  border-radius: 6px;
  box-shadow: ${(props) => props.theme.shadows.around};
`;

const Img = styled.img`
  border-radius: 6px;
  width: 100%;
  height: 100%;
`;

const Bird = styled(LoginBird)`
  position: absolute;
  top: -77px;
  right: -20px;
  z-index: -1;
`;

// 1차 배포 - 체험하기 숨김처리
// const ExperienceWrapper = styled.div`
//   background-color: transparent;
//   width: 100%;
//   height: 20%;
//   text-align: center;
// `;

// const ExperienceButton = styled.button`
//   width: 350px;
//   height: 35%;
//   border-radius: 6px;
//   background-color: ${(props) => props.theme.colors.button};
//   font-family: 'Noto Sans KR', sans-serif;
//   font-weight: medium;
//   font-size: 18px;
//   color: white;
// `;
