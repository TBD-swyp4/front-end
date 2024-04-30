import styled from 'styled-components';
import NaverLogin from './naverLogin/NaverLogin';
const LoginPage = () => {
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
